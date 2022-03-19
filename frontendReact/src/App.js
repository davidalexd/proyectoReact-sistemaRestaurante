import React from "react";
import Routes from "./routes/Routes";
import { Elements } from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51JufoqDOx3uLFoGuPQ9nzWKNDHkXnx7cCdfbpHgwwad1mb3ud8mVFC4wyxAnsaeFaFszz9wGAo1IjKSxHUVMmr1p000UruvIiW"
);
function App(props) {
  return (
    <Elements stripe={stripePromise}>
      <div className="App">
        <Routes />
      </div>
    </Elements>
  );
}

export default App;
