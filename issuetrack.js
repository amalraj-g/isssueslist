document.getElementById("issueInputForm").addEventListener("submit", saveIssue);
    
function saveIssue() {
        let issueId = chance.guid();
        let issueDesc = document.getElementById("issueDescInput").value;
        let issueAssignedTo = document.getElementById("issueAssignedToInput").value;
        let issueStatus = "open";
        let issue = {
          "id": issueId,
          "description": issueDesc,
          "assignedTo": issueAssignedTo,
          "status": issueStatus
        };
        
       if (localStorage.getItem("issues") === null) {
          let issues = [];
          issues.push(issue);
          localStorage.setItem("issues", JSON.stringify(issues));
        } else {
          let issues = JSON.parse(localStorage.getItem("issues"));
          issues.push(issue);
          localStorage.setItem("issues", JSON.stringify(issues));
        }
        
        document.getElementById("issueInputForm").reset();
        fetchIssues();
}
    
  function setStatusClosed (id) {
          var issues = JSON.parse(localStorage.getItem("issues"));
          
          for(let i = 0; i < issues.length; i++) {
            if (issues[i].id === id) {
              issues[i].status ="closed";
            }
          }
            
          localStorage.setItem("issues", JSON.stringify(issues));
          
          fetchIssues();
  }
        
  function deleteIssue (id) {
          var issues = JSON.parse(localStorage.getItem("issues"));
          
          for(let i = 0; i < issues.length; i++) {
            if (issues[i].id === id) {
              issues.splice(i, 1);
            }
          }
          
          localStorage.setItem("issues", JSON.stringify(issues));
          
         fetchIssues();
  } 

  function fetchIssues () {
        var issues = JSON.parse(localStorage.getItem("issues"));
        var issuesList = document.getElementById("issuesList");
        
        issuesList.innerHTML = "";
        
        for (let i = 0; i < issues.length; i++) {
          var id = issues[i].id;
          var desc = issues[i].description;
          var assignedTo = issues[i].assignedTo;
          var status = issues[i].status;
          
          issuesList.innerHTML +=   '<div class="well">'+
                                    '<h6>Issue ID: ' + id + '</h6>'+
                                    '<p><span class="label label-info">' + status + '</span></p>'+
                                    '<p><span class="glyphicon glyphicon-text-width"></span> ' + desc + '</p>'+
                                    '<p></p><span class="glyphicon glyphicon-user"></span> ' + assignedTo + '</p>'+
                                    '<a href="#" class="btn btn-warning" onclick="setStatusClosed(\''+id+'\')">Close</a> '+
                                    '<a href="#" class="btn btn-danger" onclick="deleteIssue(\''+id+'\')">Delete</a>'+
                                    '</div>';
          }
    
}   

      
