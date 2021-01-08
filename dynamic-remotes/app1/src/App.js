import React from "react";

const loadComponent = (scope, module) => {
  return async () => {
    await __webpack_init_sharing__("default");

    const container = window[scope];
    await container.init(__webpack_share_scopes__.default);
    const factory = await window[scope].get(module);
    const Module = factory();
    return Module;
  };
};

const useDynamicScript = args => {
  const [ready, setReady] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    if (args.url) {
      const element = document.createElement("script");

      element.src = args.url;
      element.type = "text/javascript";
      element.async = true;

      setReady(false);
      setFailed(false);

      element.onload = () => setReady(true);

      element.onerror = () => {
        setReady(false);
        setFailed(true);
      };

      document.head.appendChild(element);

      return () => document.head.removeChild(element);
    }
  }, [args.url]);

  return {
    ready,
    failed,
  };
};

const System = props => {
  const { ready, failed } = useDynamicScript({
    url: props.system && props.system.url,
  });

  if (!props.system) {
    return <h2>Not system specified</h2>;
  }
  if (!ready) {
    return <h2>Loading dynamic script: {props.system.url}</h2>;
  }
  if (failed) {
    return <h2>Failed to load dynamic script: {props.system.url}</h2>;
  }

  const Component = React.lazy(loadComponent(props.system.scope, props.system.module));

  return (
    <React.Suspense fallback="Loading System">
      <Component />
    </React.Suspense>
  );
};

const App = () => {
  const [system, setSystem] = React.useState(undefined);
  const setApp2 = () => {
    setSystem({
      url: "http://localhost:3002/remoteEntry.js",
      scope: "app2",
      module: "Widget",
    });
  };
  const setApp3 = () => {
    setSystem({
      url: "http://localhost:3003/remoteEntry.js",
      scope: "app3",
      module: "./Widget",
    });
  };

  return (
    <div>
      <h2>App 1</h2>
      <button onClick={setApp2}>Load App 2 Widget</button>
      <button onClick={setApp3}>Load App 3 Widget</button>
      <div style={{ marginTop: "2em" }}>
        <System system={system} />
      </div>
    </div>
  );
};

export default App;
