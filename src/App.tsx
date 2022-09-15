import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import {
  generateMultisigFromPublicKeys,
  generateMultisigFromHex,
  P2SH, // or: P2SH_P2WSH, P2WSH,
  TESTNET, // or: MAINNET,
  multisigAddress,
} from "unchained-bitcoin";

function Example() {
  // Public keys are represented as compressed hex.
  const publicKeys = [
    "02a8513d9931896d5d3afc8063148db75d8851fd1fc41b1098ba2a6a766db563d4",
    "03938dd09bf3dd29ddf41f264858accfa40b330c98e0ed27caf77734fac00139ba",
  ];

  // A testnet P2SH 2-of-2 multisig.
  const m1 = generateMultisigFromPublicKeys(TESTNET, P2SH, 2, ...publicKeys);
  console.log(multisigAddress(m1));
  // 2N5KgAnFFpmk5TRMiCicRZDQS8FFNCKqKf1

  const redeemScript =
    "522102a8513d9931896d5d3afc8063148db75d8851fd1fc41b1098ba2a6a766db563d42103938dd09bf3dd29ddf41f264858accfa40b330c98e0ed27caf77734fac00139ba52ae";
  // Same as m1 but using redeem script
  const m2 = generateMultisigFromHex(TESTNET, P2SH, redeemScript);
  console.log(multisigAddress(m2));
  // 2N5KgAnFFpmk5TRMiCicRZDQS8FFNCKqKf1
}

function App() {
  const [count, setCount] = useState(0);

  Example();

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
