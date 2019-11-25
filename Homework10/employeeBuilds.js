const managerHTML = 
`<div class="card" style="width: 18rem;">
<div class="card-header">
  <h1>${manager.name}</h1>
  <br>
  <h2><i class="fas fa-mug-hot"></i>Manager</h2>
</div>
<ul class="list-group list-group-flush">
  <li class="list-group-item">ID: ${manager.id}</li>
  <li class="list-group-item">E-Mail: ${manager.email}</li>
  <li class="list-group-item">Office Number: ${manager.officeNum}</li>
</ul>
</div>`

const engineerHTML =
`<div class="card" style="width: 18rem;">
<div class="card-header">
  <h1>${engineer.name}</h1>
  <br>
  <h2><i class="fas fa-code-branch"></i>Engineer</h2>
</div>
<ul class="list-group list-group-flush">
  <li class="list-group-item">ID: ${engineer.id}</li>
  <li class="list-group-item">E-Mail: ${engineer.email}</li>
  <li class="list-group-item">Github: ${engineer.github}</li>
</ul>
</div>`

const internHTML =
`<div class="card" style="width: 18rem;">
<div class="card-header">
  <h1>${intern.name}</h1>
  <br>
  <h2><i class="fas fa-graduation-cap"></i>Intern</h2>
</div>
<ul class="list-group list-group-flush">
  <li class="list-group-item">ID: ${intern.id}</li>
  <li class="list-group-item">E-Mail: ${intern.email}</li>
  <li class="list-group-item">School: ${intern.school}</li>
</ul>
</div>`

module.exports = {
    managerHTML,
    engineerHTML,
    internHTML
}