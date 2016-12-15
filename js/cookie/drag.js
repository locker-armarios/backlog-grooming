$(document).ready(
	function () {
		
		// verifica se cookies existem
		if ($.cookie('coluna1') != null) {
			//alert($.cookie('coluna1'));
			// formata string do cookie
			var coluna1 = $.cookie('coluna1').replace(/drop-esquerda\[\]=/g, '');
			var coluna1 = coluna1.split('&');
			//alert(coluna1);
			var div_id = '';
			for (var x = 0; x <= coluna1.length; x++) {
				div_id = coluna1[x];
				$('#drop-esquerda').append($('#'+div_id)); 
			}
		}
		if ($.cookie('coluna2') != null) {
			var coluna2 = $.cookie('coluna2').replace(/drop-direita\[\]=/g, '');
			var coluna2 = coluna2.split('&');
			//alert(coluna2);
			var div_id = '';
			for (var x = 0; x <= coluna2.length; x++) {
				div_id = coluna2[x];
				$('#drop-direita').append($('#'+div_id)); 
			}
		}		
		
		
		
		
		$('div.recebeDrag').Sortable(
			{
				accept			: 'itemDrag',
				helperclass		: 'dragAjuda',
				activeclass 	: 'dragAtivo',
				hoverclass 		: 'dragHover',
				handle			: 'h2',
				opacity			: 0.7,
				onChange 		: function()
				{	    			 
					serialEsq = $.SortSerialize('drop-esquerda');
					serialDir = $.SortSerialize('drop-direita');
					$('#ser-e').val(serialEsq.hash);
					$('#ser-d').val(serialDir.hash);
					// salva cookie com posicionamento
					$.cookie('coluna1', serialEsq.hash, {expires: 7});
					$.cookie('coluna2', serialDir.hash, {expires: 7});
					//alert($.cookie('coluna1'));
				},
				onStart : function()
				{
					$.iAutoscroller.start(this, document.getElementsByTagName('body'));
				},
				onStop : function()
				{
					$.iAutoscroller.stop();
				}
			}
		);
		
	}
);
