
import React from "react";

import { terms } from "../../utitlities/Variables";
import { useUserState } from "../../utitlities/firebase";
import { TermButton } from "./TermButton";

import { SignInButton } from "./SignIn";
import { SignOutButton } from "./SignOut";





export const TermSelector = ({term, setTerm}) => {
  const [user] = useUserState();
  return (
    <div className="btn-toolbar justify-content-between">
      <div className="btn-group">
      { 
        Object.values(terms).map(
          value => <TermButton key={value} term={value} setTerm={setTerm} checked={value === term} />
        )
      }
      </div>
       { user ? <SignOutButton /> : <SignInButton /> }
    </div>
  );
};