import { useState, useEffect } from "react";

const dependencyLibraryInfo = {
  react: {
    react: "https://cdn.skypack.dev/react",
    "react-dom": "https://cdn.skypack.dev/react-dom",
    "styled-components": "https://cdn.skypack.dev/styled-components",
  },
  javascript: {},
  redux: {
    react: "https://cdn.skypack.dev/react",
    "react-dom": "https://cdn.skypack.dev/react-dom",
    "@reduxjs/toolkit": "https://cdn.skypack.dev/@reduxjs/toolkit",
    "react-redux": "https://cdn.skypack.dev/react-redux",
    "styled-components": "https://cdn.skypack.dev/styled-components",
  },
};

function useDependency(templete) {
  const [isDependencyFormShow, setIsDependencyFormShow] = useState(false);
  const [dependencyFormErrorMessage, setDependencyFormErrorMessage] =
    useState("");

  const [dependencyInfo, setDependencyInfo] = useState({});

  useEffect(() => {
    const templeteType = templete.split(" ")[0];

    setDependencyInfo(dependencyLibraryInfo[templeteType]);
  }, [templete]);

  function handleDependencyAddButtonClick() {
    setIsDependencyFormShow(true);
  }

  function handleDependencyFormCancelButtonClick() {
    setIsDependencyFormShow(false);
  }

  function addNewDependency(event) {
    event.preventDefault();

    const dependency = event.target.fileName.value;
    const dependencyName = dependency.slice(dependency.indexOf(".dev/") + 5);

    if (dependencyInfo[dependencyName]) {
      setDependencyFormErrorMessage("이미 등록된 디펜던시 입니다.");
      event.target.fileName.value = "";
      return;
    }

    setDependencyInfo({ ...dependencyInfo, [dependencyName]: dependency });
    event.target.fileName.value = "";
  }

  function handleDependencyDeleteButtonClick(dependency) {
    delete dependencyInfo[dependency];
    setDependencyInfo({ ...dependencyInfo });
  }

  return {
    dependencyInfo,
    isDependencyFormShow,
    dependencyFormErrorMessage,
    handleDependencyAddButtonClick,
    handleDependencyFormCancelButtonClick,
    addNewDependency,
    handleDependencyDeleteButtonClick,
  };
}

export default useDependency;
