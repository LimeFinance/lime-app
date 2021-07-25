import * as functions from "firebase-functions";
import { ADDRESSES, DEFAULT_NET } from "./constants";
import { tokenFarm } from "./contracts";
import firebase from "./initFirebase";
import { IPool } from "./interfaces";
import { getApr, getPoolSizeBusd, getPrice, fromTokens } from "./utils";
import cors from "cors";

const _cors = cors({ origin: true });

exports.updatePoolAndStats = functions.https.onRequest((req, res) => {
  _cors(req, res, async () => {
    const { firestore } = firebase;
    const poolIndex = req.body.poolIndex?.toString();

    if (!poolIndex) return;

    const pools: IPool[] = await tokenFarm.methods.getPools().call();
    const pool = pools[Number(poolIndex)];

    const poolsRef = firestore().collection("networks").doc(DEFAULT_NET).collection("pools");
    const poolRef = poolsRef.doc(poolIndex);

    const poolFromDB = await poolRef.get();
    const poolData = poolFromDB.data();

    if (!poolData || req.method !== "POST") return;

    const limePrice = await getPrice(ADDRESSES[DEFAULT_NET].limeToken);

    const apr = getApr(pool, limePrice);
    const poolSizeBusd = await getPoolSizeBusd(pool, poolData.isLp);

    poolRef.update({
      poolSize: fromTokens(pool.poolSize),
      apr: fromTokens(apr),
      poolSizeBusd: Number(fromTokens(poolSizeBusd)),
    });

    // Then update the TVL and hottest pool
    const statsRef = firestore()
      .collection("networks")
      .doc(DEFAULT_NET)
      .collection("stats")
      .doc("main");

    let tvl = 0;
    let hottestPool: null | { name: string; size: number } = null;

    const allPoolsDB = await poolsRef.where("poolSize", "!=", null).get();

    allPoolsDB.forEach((doc) => {
      const { poolSizeBusd, name } = doc.data();
      tvl += poolSizeBusd;
      if (hottestPool) {
        if (hottestPool.size < poolSizeBusd) hottestPool = { name, size: poolSizeBusd };
      } else {
        hottestPool = { name, size: poolSizeBusd };
      }
    });

    statsRef.update({
      tvl,
      hottestPool,
    });

    res.json({
      success: true,
    });
  });
});
