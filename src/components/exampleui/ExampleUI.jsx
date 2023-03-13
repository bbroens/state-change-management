import React from "react";
import "./exampleui.scss";

// TODO Debounce onChange handlers

const WebApp = () => {
  return (
    <div className="example-ui">
      <h1>Example UI with app-level state</h1>
      <form>
        <section className="textSection">
          Username:
          <input type="text" value="" onChange="" />
          Score:
          <input type="number" value="" onChange="" />
        </section>
        <section className="checkboxSection">
          <p>Some preferences:</p>
          <div>
            <input type="checkbox" name="preference_one" checked /> Preference
            one
          </div>
          <div>
            <input type="checkbox" name="preference_two" /> Preference two
          </div>
          <div>
            <input type="checkbox" name="preference_three" /> Preference three
          </div>
        </section>
        <section className="buttonSection">
          <button>Some action</button>
          <button>Some other action</button>
        </section>
      </form>
    </div>
  );
};

export default WebApp;
