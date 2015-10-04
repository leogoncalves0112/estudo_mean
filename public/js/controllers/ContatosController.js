angular.module('contatooh').controller('ContatosController',
	function($scope, Contato) {
		$scope.contatos = [];
		
		$scope.filtro = '';
		
		$scope.mensagem = {texto: ''};
		
		//var Contato = $resource('/contatos/:id');
		
		function buscaContatos() {
			Contato.query(
				function(contatos) {
					$scope.contatos = contatos;
					$scope.mensagem = {};
				},
				function(erro) {
					console.log(erro);
					$scope.mensagem = {texto: 'N�o foi poss�vel obter a lista'};
				}
			);
		}
		buscaContatos();
		
		$scope.remove = function(contato) {
			Contato.delete({id: contato._id},
				buscaContatos,
				function(erro) {
					console.log(erro);
					$scope.mensagem = {texto: 'N�o foi poss�vel remover o contato'};
				}
			);
		};
		
		/*var promise = Contato.query().$promise;
		promise
			.then(function(contatos) {
				$scope.contatos = contatos;
			})
			.catch(function(erro) {
				console.log("N�o foi poss�vel obter a lista de contatos");
				console.log(erro);
			});*/
		
		/*$http.get('/contatos')
			.success(function(data) {
				$scope.contatos = data;
			})
			.error(function(statusText) {
				console.log("N�o foi poss�vel obter a lista de contatos");
				console.log(statusText);
			});*/

});