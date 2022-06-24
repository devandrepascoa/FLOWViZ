const onSuccess = require("./controllerUtils");

module.exports = (workflowService) => {
  function getWorkflows(req, res, next) {
    workflowService
      .getWorkflows()
      .then((data) => onSuccess(res, data))
      .catch((err) => next(err));
  }

  function getWorkflow(req, res, next) {
    const workflowId = req.params.id;

    workflowService
      .getWorkflow(workflowId)
      .then((data) => onSuccess(res, data))
      .catch((err) => next(err));
  }

  function postWorkflow(req, res, next) {
    const workflow = req.body;

    workflowService
      .postWorkflow(workflow)
      .then((data) => onSuccess(res, data, 201))
      .catch((err) => next(err));
  }

  return {
    getWorkflows: getWorkflows,
    getWorkflow: getWorkflow,
    postWorkflow: postWorkflow,
  };
};
