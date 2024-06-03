var nome = document.getElementById("nome");
var cpf = document.getElementById("cpf");
var dataNascimento = document.getElementById("data");
var endereco = document.getElementById("endereco");

var btnAdd = document.getElementById("btnAdd");
var btnShow = document.getElementById("btnShow");
var btnDelete = document.getElementById("btnDelete");
var btnSearch = document.getElementById("btnSearch");

var contatos = document.getElementById("contatos");

var users = [];

function existsCpf(cpf){
    return users.some(user => user.userCpf === cpf);
}

function add(){
    var user = {
        userNome: nome.value,
        userCpf: cpf.value,
        userData: dataNascimento.value,
        userEndereco: endereco.value,
    }

    if(!existsCpf(user.userCpf)){
        users.push(user);
        nome.value = '',
        cpf.value = '',
        dataNascimento.value = '',
        endereco.value = '';

        alert("Contato salvo com sucesso!")
        user = null;
    }else{
        alert("O cpf ja existe!");
    }
    showContatos();

    event.preventDefault();
}

function createCard(nome, cpf, data, endereco){
    var div = document.createElement("div");
    div.className = "card";
    var title = document.createElement("h1");
    title.textContent = nome;
    div.appendChild(title);

    var infos = document.createElement("div");
    div.appendChild(infos);

    var cpfContent = document.createElement("p");
    cpfContent.textContent = `CPF: ${cpf}`;
    infos.appendChild(cpfContent);

    var dataContent = document.createElement("p");
    dataContent.textContent = `Data de nascimento: ${data}`;
    infos.appendChild(dataContent);

    var enderecoContent = document.createElement("p");
    enderecoContent.textContent = `Endereço: ${endereco}`;
    infos.appendChild(enderecoContent);

    return div;
}

function removeChild(){
    while(contatos.firstChild){
        contatos.removeChild(contatos.firstChild);
    }
}

function showContatos(){
    removeChild();
    if(users.length > 0){
    contatos.style.display = "flex";

    users.forEach(user =>{
        contatos.appendChild(createCard(user.userNome, user.userCpf, user.userData, user.userEndereco));
    })
}

    event.preventDefault();
}

function deleteContato(cpf){
    const index = users.findIndex(user => user.userCpf === cpf);
  if (index != -1) {
    const user = users.find(user => user.userCpf === cpf); 
    users.splice(index, 1);
    alert(`Contato "${user.userNome}" removido com sucesso!`);
    showContatos();
  } else {
    alert("Não existe contato com o cpf informado!");
  }

  event.preventDefault();
}

function searchContato(cpf){
    var user = users.find(user => user.userCpf === cpf);
    if(user!=null){
    removeChild();
    contatos.style.display = "flex";
    contatos.appendChild(createCard(user.userNome, user.userCpf, user.userData, user.userEndereco));
    alert("Contato encontrado!");
    }else{
        alert("Usuário não encontrado!");
    }

    event.preventDefault();
}
btnAdd.addEventListener("click", add);
btnShow.addEventListener("click", showContatos);
btnDelete.addEventListener("click", ()=>deleteContato(cpf.value));
btnSearch.addEventListener("click", ()=>searchContato(cpf.value))