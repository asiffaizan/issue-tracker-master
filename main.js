const issueInputForm = document.getElementById('issueInputForm');
const issuesList = document.getElementById('issuesList');
const totalIssueCount = document.getElementById('total-issue');
const openIssueCount = document.getElementById('open-issue');
const closedIssueCount = document.getElementById('closed-issue');

issueInputForm.addEventListener('submit', submitIssue);

function getInputValue(id) {
  return document.getElementById(id).value;
}

function updateLocalStorage(issues) {
  localStorage.setItem('issues', JSON.stringify(issues));
}

function fetchIssues() {
  let issues = JSON.parse(localStorage.getItem('issues')) || [];
  issuesList.innerHTML = '';
  
  let openIssue = 0;
  
  for (const issue of issues) {
    const { id, description, severity, assignedTo, status } = issue;
    const textDecoration = status === 'Closed' ? 'text-decoration: line-through; text-decoration-color: red' : 'text-decoration: none';
    
    issuesList.innerHTML += `
      <div class="well">
        <h6>Issue ID: ${id}</h6>
        <p><span class="label label-info">${status}</span></p>
        <h3 id=${status} style="${textDecoration}">${description}</h3>
        <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
        <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
        <a href="#" onclick="closeIssue(${id})" class="btn btn-warning">Close</a>
        <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
      </div>`;
    
    if (status === 'Open') {
      openIssue++;
    }
  }
  
  totalIssueCount.innerText = issues.length;
  openIssueCount.innerText = openIssue;
  closedIssueCount.innerText = issues.length - openIssue;
}

function submitIssue(e) {
  e.preventDefault();

  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random() * 100000000).toString();
  const status = 'Open';

  const issue = { id, description, severity, assignedTo, status };
  let issues = JSON.parse(localStorage.getItem('issues')) || [];
  issues.push(issue);
  updateLocalStorage(issues);

  issueInputForm.reset();
  fetchIssues();
}

function closeIssue(id) {
  let issues = JSON.parse(localStorage.getItem('issues')) || [];
  const issueIndex = issues.findIndex(issue => issue.id == id);

  if (issueIndex !== -1) {
    issues[issueIndex].status = 'Closed';
    updateLocalStorage(issues);
    fetchIssues();
  }
}

function deleteIssue(id) {
  let issues = JSON.parse(localStorage.getItem('issues')) || [];
  const issueIndex = issues.findIndex(issue => issue.id == id);

  if (issueIndex !== -1) {
    issues.splice(issueIndex, 1);
    updateLocalStorage(issues);
    fetchIssues();
  }
}

fetchIssues();
