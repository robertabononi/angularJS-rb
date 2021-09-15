angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function($scope, $http) {
    $scope.app = "Lista Telefônica";
    $scope.contatos = [];
    $scope.operadoras = [];

    let carregarOperadoras = function() {
        $http.get('http://localhost:3412/operadoras').then(function(response) {
            $scope.operadoras = response.data;
        })
    }

    let carregarContatos = function() {
        $http.get('http://localhost:3412/contatos').then(function(response) {
            //console.log(response.data);
            $scope.contatos = response.data;
        })
    }
    
    $scope.addContato = function(contato) {
        $scope.contatos.push(angular.copy(contato));
        delete $scope.contato;
        $scope.contatoForm.$setPristine();
    }
    $scope.apagarContato = function(contatos) {
        $scope.contatos = contatos.filter(function(contato) {
            if (!contato.selecionado) return contato;
        })
    }
    $scope.isContatoSelecionado = function(contatos) {
        return contatos.some(function(contato) {
            return contato.selecionado;
        });
    }
    $scope.ordenarPor = (campo) => {
        $scope.criterioDeOrdenacao = campo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
    }
    carregarContatos();
    carregarOperadoras();
})