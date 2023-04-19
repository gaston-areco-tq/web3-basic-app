import React, { useState } from "react";
import { contract } from "../contracts/utils";

const Form = () => {
  const [lastJoke, setLastJoke] = useState("No value");

  const readBlockchain = async () => {
    const lastJoke = await contract.getLastJoke();
    const { events: [{ args: { joke } }] } = await lastJoke.wait()
    setLastJoke(joke);
  };

  const writeBlockchain = (data) => {
    data.preventDefault();
    contract.mint(!!data.target.verdict.value, data.target.newJoke.value);
  };

  return (
    <>
      <form onSubmit={writeBlockchain}>
        <input id="newJoke" />
        <input type="radio" id="verdictGood" name="verdict" value="1"/>
        <label htmlFor="verdictGood">Good Joke</label>
        <input type="radio" id="verdictBad" name="verdict" value="0"/>
        <label htmlFor="verdictBad">Bad Joke</label>
        <button type="submit">SUBMIT</button>
      </form>
      <button onClick={readBlockchain}>Get current value</button>
      <p>{lastJoke}</p>
    </>
  );
};

export default Form;
