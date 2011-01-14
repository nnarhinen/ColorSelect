$.widget('ui.colorselect', {
	options: {
	},
	_create: function() {
		var widget = this;
		widget.select = widget.element;
		widget.element = $('<a href="#" class="ui-widget ui-state-default ui-corner-all"></a>')
			.css({
				'position': 'absolute',
				'text-decoration': 'none',
				'display': 'inline-block'
			})
			.append($('<span class="ui-colorselect-selected">Color</span>')
				.css({
					'display': 'inline-block',
					'margin-left': '4px'
				}))
			.append($('<span class="ui-icon ui-icon-triangle-1-s"></span>')
				.css({
					'display': 'inline-block',
					'margin': 'auto',
					'position': 'absolute',
					'right': '0px',
					'margin-top': '-8px',
					'top': '50%'
				}))
			.bind('mouseenter mouseleave', function() { $(this).toggleClass('ui-state-hover'); })
			.click(function() {
				widget.toggleVisibility();
				return false;
			});
		widget.select.hide().after(widget.element);
		widget.list = $('<ul class="ui-corner-all" />').css({
			'margin': '0px',
			'padding': '0px',
			'width': '200px',
			'position': 'absolute'
		});
		widget.select.find('option').each(function(key, element) {
			widget.list.append(
				$('<li class="ui-widget ui-state-default" />')
					.data('optionItem', $(element))
					.append(widget._getColorBox($(element).val()).css('margin-left', '4px'))
					.append($(element).text())
					.bind('mouseenter mouseleave', function() { $(this).toggleClass('ui-state-hover'); })
					.click(function() {
						widget.select.val($(this).data('optionItem').val());
						widget.select.change();
						widget.toggleVisibility();
					})
			);
		});
		widget.list.find('li:last-child').addClass('ui-corner-bottom');
		widget.element.after(widget.list);
		widget.element.width(widget.list.width() - 2);
		widget.list.hide();
		widget.select.change(function() {
			widget.selectChanged();
		});
		widget.select.change();
		
		$(document).click(function () {
			if (widget.list.is(':visible')) {
				widget.toggleVisibility();
			}
		});
	},
	selectChanged: function() {
		widget = this;
		var selectedOption = widget.select.find(':selected');
		widget.element.find('.ui-colorselect-selected').html('').append(widget._getColorBox(selectedOption.val())).append(selectedOption.text());
		widget.list.find('li').removeClass('ui-state-active').each(function(key, element) {
			if ($(element).data('optionItem').val() == selectedOption.val()) {
				$(element).addClass('ui-state-active');
			}
		});
	},
	toggleVisibility: function() {
		widget.element.toggleClass('ui-state-active');
		widget.element.toggleClass('ui-corner-all');
		widget.element.toggleClass('ui-corner-top');
		if (widget.list.is(':visible')) {
			widget.list.hide();
		}
		else {
			widget.list.show();
			widget.list.css({
				'top': widget.element.offset().top + widget.element.height(),
				'left': widget.element.offset().left
			});
		}
	},
	_getColorBox: function(color) {
		return $('<span></span>')
			.css({
				'display': 'inline-block',
				'width': '40px',
				'height': '0.7em',
				'background-color': color,
				'border': '1px solid #000',
				'margin-right': '4px'
			})
	}
});