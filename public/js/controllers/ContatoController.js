angular.module('contatooh').controller('ContatoController',
	function($scope, $routeParams, Contato) {
		
		//var Contato = $resource('/contatos/:id');

		if($routeParams.contatoId) {
			Contato.get({id: $routeParams.contatoId},
				function(contato) {
					$scope.contato = contato;
				},
				function(erro) {
					console.log(erro);
					$scope.mensagem = {texto: 'N�o foi poss�vel obter o contato.'};
				}
			);
		} else {
			$scope.contato = new Contato();
		}
		
		$scope.salva = function() {
			$scope.contato.$save()
				.then(function() {
					$scope.mensagem = {texto: 'Salvo com sucesso'};
					// limpa o formul�rio
					$scope.contato = new Contato();
				})
				.catch(function(erro) {
					$scope.mensagem = {texto: 'N�o foi poss�vel salvar'};
				});
		};
		
		Contato.query(function(contatos) {
			$scope.contatos = contatos;
		});
		
});