import * as firebase from "@firebase/app";
import Web3 from "web3";

const web3 = new Web3();

import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDhaXO2mBbYWAzh9UUUeYLy5dZ38FrXD48",
  authDomain: "limefinance-ee38a.firebaseapp.com",
  projectId: "limefinance-ee38a",
  storageBucket: "limefinance-ee38a.appspot.com",
  messagingSenderId: "857571082014",
  appId: "1:857571082014:web:ca53cfd8db279d7386930f",
};

// Initialize Firebase
firebase.firebase.initializeApp(firebaseConfig);

const fst = firebase.firebase.firestore();

const poolsRef = fst.collection("networks").doc("testnet").collection("pools");

poolsRef.doc("0").set({
  apr: "",
  homepage: true,
  isFeatured: true,
  isLp: true,
  limePerBlock: web3.utils.toWei("10"),
  name: "BNB/LIME LP",
  poolSize: "0",
  poolSizeBusd: 0,
  taxFree: true,
  token: "",
});

poolsRef.doc("1").set({
  apr: "",
  homepage: false,
  isFeatured: true,
  isLp: true,
  limePerBlock: web3.utils.toWei("10"),
  name: "BUSD/LIME LP",
  poolSize: "0",
  poolSizeBusd: 0,
  taxFree: true,
  token: "",
});

poolsRef.doc("2").set({
  apr: "",
  homepage: false,
  isFeatured: false,
  isLp: true,
  limePerBlock: web3.utils.toWei("7.5"),
  name: "BNB/BUSD LP",
  poolSize: "0",
  poolSizeBusd: 0,
  taxFree: false,
  token: "0xe0e92035077c39594793e61802a350347c320cf2",
});

poolsRef.doc("3").set({
  apr: "",
  homepage: false,
  isFeatured: false,
  isLp: true,
  limePerBlock: web3.utils.toWei("7.5"),
  name: "DAI/BUSD LP",
  poolSize: "0",
  poolSizeBusd: 0,
  taxFree: false,
  token: "0xf8e4ce287e0d1f9c9fda5ec917515cb87d9c1e6c",
});
poolsRef.doc("4").set({
  apr: "",
  homepage: false,
  isFeatured: true,
  isLp: false,
  limePerBlock: web3.utils.toWei("12.5"),
  name: "LIME",
  poolSize: "0",
  poolSizeBusd: 0,
  taxFree: true,
  token: "",
});
poolsRef.doc("5").set({
  apr: "",
  homepage: true,
  isFeatured: true,
  isLp: false,
  limePerBlock: web3.utils.toWei("15"),
  name: "BUSD",
  poolSize: "0",
  poolSizeBusd: 0,
  taxFree: false,
  token: "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7",
});

poolsRef.doc("6").set({
  apr: "",
  homepage: false,
  isFeatured: true,
  isLp: false,
  limePerBlock: web3.utils.toWei("15"),
  name: "WBNB",
  poolSize: "0",
  poolSizeBusd: 0,
  taxFree: false,
  token: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
});

poolsRef.doc("7").set({
  apr: "",
  homepage: false,
  isFeatured: true,
  isLp: false,
  limePerBlock: web3.utils.toWei("8.5"),
  name: "ETH",
  poolSize: "0",
  poolSizeBusd: 0,
  taxFree: false,
  token: "0x8babbb98678facc7342735486c851abd7a0d17ca",
});

poolsRef.doc("8").set({
  apr: "",
  homepage: false,
  isFeatured: false,
  isLp: false,
  limePerBlock: web3.utils.toWei("8.5"),
  name: "CAKE",
  poolSize: "0",
  poolSizeBusd: 0,
  taxFree: false,
  token: "0xf9f93cf501bfadb6494589cb4b4c15de49e85d0e",
});
