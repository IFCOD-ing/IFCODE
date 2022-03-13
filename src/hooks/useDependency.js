import { useState } from "react";

function useDependency() {
  const [isDependencyFormShow, setIsDependencyFormShow] = useState(false);
  const [dependencyFormErrorMessage, setDependencyFormErrorMessage] =
    useState("");

  const [dependencyInfo, setDependencyInfo] = useState({});

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
