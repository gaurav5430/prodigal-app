import Axios from "axios";

const baseURL = "https://damp-garden-93707.herokuapp.com/";
const getListOfAgentsApi = "getlistofagents";
const getDurationRangeApi = "getdurationrange";
const getFilteredCallsApi = "getfilteredcalls";
const getCallListApi = "getcalllist";
const getListOfLabelsApi = "getlistoflabels";
const applyLabelsApi = "applyLabels";

const dummyUserID = "a12345";
function getListOfAgents() {
  return Axios.get(`${baseURL}${getListOfAgentsApi}`);
}

function getDurationRange() {
  return Axios.get(`${baseURL}${getDurationRangeApi}`);
}

function getFilteredCalls(agentList, timeRange) {
  return Axios.post(`${baseURL}${getFilteredCallsApi}`, {
    info: {
      filter_agent_list: agentList,
      filter_time_range: timeRange
    }
  });
}

function getCallList() {
  return Axios.get(`${baseURL}${getCallListApi}`, {
    headers: {
      user_id: dummyUserID
    }
  });
}

function getListOfLabels() {
  return Axios.get(`${baseURL}${getListOfLabelsApi}`, {
    headers: {
      user_id: dummyUserID
    }
  });
}

function applyLabels(callList, label_ops) {
  return Axios.post(
    `${baseURL}${applyLabelsApi}`,
    {
      operation: {
        callList,
        label_ops
      }
    },
    {
      headers: {
        user_id: dummyUserID
      }
    }
  );
}

export {
  getListOfAgents,
  getDurationRange,
  getFilteredCalls,
  getCallList,
  getListOfLabels,
  applyLabels
};
