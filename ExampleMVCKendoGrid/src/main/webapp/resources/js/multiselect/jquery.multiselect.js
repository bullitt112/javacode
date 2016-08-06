/* jshint forin:true, noarg:true, noempty:true, eqeqeq:true, boss:true, undef:true, curly:true, browser:true, jquery:true */
/*
 * jQuery MultiSelect UI Widget 1.14pre
 * Copyright (c) 2012 Eric Hynds
 *
 * http://www.erichynds.com/jquery/jquery-ui-multiselect-widget/
 * CUSTOM!!!!
 *
 * Depends:
 *   - jQuery 1.4.2+
 *   - jQuery UI 1.8 widget factory
 *
 * Optional:
 *   - jQuery UI effects
 *   - jQuery UI position utility
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 */
(function($, undefined) {

  var multiselectID = 0;
  var $doc = $(document);

  $.widget("ech.multiselect", {

    // default options
    options: {
      header: true,
      height: 325,
      minWidth: 225,
      classes: '',
      checkAllText: 'Check all',
      uncheckAllText: 'Uncheck all',
      noneSelectedText: 'Select options',
      selectedText: '# selected',
      selectedList: 0,
      show: null,
      hide: false,
      autoOpen: true,
      multiple: true,
      position: {}
    },

    _create: function() {
      var el = this.element.hide();
      var o = this.options;
      
      if (typeof(console) != 'undefined') console.log('_create	-	' + $(el).attr('id'));

      this.speed = $.fx.speeds._default; // default speed for effects
      this._isOpen = false; // assume no

      // create a unique namespace for events that the widget
      // factory cannot unbind automatically. Use eventNamespace if on
      // jQuery UI 1.9+, and otherwise fallback to a custom string.
      this._namespaceID = this.eventNamespace || ('multiselect' + multiselectID);

     
      var button = (this.button = $('<button type="button" style="display:none;"																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																									><span class="ui-icon ui-icon-triangle-2-n-s"></span></button>'))
        .addClass('ui-multiselect ui-widget ui-state-default ui-corner-all')
        .addClass(o.classes)
        .attr({ 'title':el.attr('title'), 'aria-haspopup':true, 'tabIndex':el.attr('tabIndex') })
        .insertAfter(el),

        buttonlabel = (this.buttonlabel = $('<span />'))
          .html(o.noneSelectedText)
          .appendTo(button),
																																																											
        menu = (this.menu = $('<div />'))
          .addClass('ui-custom ui-multiselect-menu ui-widget ui-widget-content ui-corner-all ui-multiselect-available')
          .addClass(o.classes)
          .insertAfter(button),

        header = (this.header = $('<div />'))
          .addClass('ui-widget-header ui-corner-all ui-multiselect-header ui-helper-clearfix')
          .appendTo(menu),

        headerLinkContainer = (this.headerLinkContainer = $('<ul />'))
          .addClass('ui-helper-reset')
          .html(function() {
            if(o.header === true) {
				return '<p class="name-box">Available</p>';
             // return '<li><a class="ui-multiselect-all" href="#"><span class="ui-icon ui-icon-check"></span><span>' + o.checkAllText + '</span></a></li><li><a class="ui-multiselect-none" href="#"><span class="ui-icon ui-icon-closethick"></span><span>' + o.uncheckAllText + '</span></a></li>';
            } else if(typeof o.header === "string") {
              return '<p>' + o.header + '</p>';
            } else {
              return '';
            }
          })
          //.append('<li class="ui-multiselect-close"><a href="#" class="ui-multiselect-close"><span class="ui-icon ui-icon-circle-close"></span></a></li>')
          .appendTo(header),

        checkboxContainer = (this.checkboxContainer = $('<ul />'))
          .addClass('ui-multiselect-checkboxes ui-helper-reset')
          .appendTo(menu),
      
        selectedContainer = (this.selectedContainer = $('<div/>'))
	    	.addClass('ui-multiselect-selected-container')
	    	.insertAfter(menu),
	    	
	    shiftButtons = (this.shiftButtons = $('<ul/>'))
	    	.addClass('ui-shift-buttons')
	    	.html('<li><a href="javascript:void(0);" class="shift-button"><div class="icon-angle-right"></div></a></li><li><a href="javascript:void(0);" class="shift-button"><div class="icon-double-angle-right"></div</a></li><li><a href="javascript:void(0);" class="shift-button"><div class="icon-angle-left"></div</a></li><li><a href="javascript:void(0);" class="shift-button"><div class="icon-double-angle-left"></div</a></li>')
	    	.appendTo(selectedContainer),
            
            
        selectedMenu = (this.selectedMenu = $('<div/>'))
        	.addClass('ui-custom ui-multiselect-menu ui-widget ui-widget-content ui-corner-all ui-multiselect-selected')
        	.appendTo(selectedContainer),
        	
        selectedHeader = (this.selectedHeader = $('<div/>')) 
          .addClass('ui-widget-header ui-corner-all ui-multiselect-header ui-helper-clearfix')
          .appendTo(selectedMenu),
          
        selectedHeaderLinkContainer = (this.selectedHeaderLinkContainer = $('<ul/>'))
        	.addClass('ui-helper-reset')
        	.html('<p class="name-box">Selected</p>')
        	.appendTo(selectedHeader),
        	
        selectedCheckboxContainer = (this.selectedCheckboxContainer = $('<ul/>'))
        	.addClass('ui-multiselect-checkboxes ui-helper-reset')
        	.appendTo(selectedMenu)
       	;
        	
      
        // perform event bindings
        this._bindEvents();
        this._bindShiftButtons();

        // build menu
        this.refresh(true);

        // some addl. logic for single selects
        if(!o.multiple) {
          menu.addClass('ui-multiselect-single');
        }
		
		//$(this).addSideMenu(menu);
        // bump unique ID
        multiselectID++;
    },

    _init: function() {
      if(this.options.header === false) {
        this.header.hide();
      }
      if(!this.options.multiple) {
		
        this.headerLinkContainer.find('.ui-multiselect-all, .ui-multiselect-none').hide();
      }
      if(this.options.autoOpen) {
        this.open();
      }
      if(this.element.is(':disabled')) {
        this.disable();
      }
    },

    refresh: function(init) {
      var el = this.element;
      var o = this.options;
      var menu = this.menu;
      var selectedMenu = this.selectedMenu;
      var checkboxContainer = this.checkboxContainer;
      var selectedCheckboxContainer = this.selectedCheckboxContainer;
      var optgroups = [];
      var seletedOptgroups = [];
      var html = "";
      var selectedHtml = "";
      var id = el.attr('id') || multiselectID++; // unique ID for the label & option tags
      var self = this;

      // build items
      el.find('option').each(function(i) {
        var $this = $(this);
        var parent = this.parentNode;
        var title = this.innerHTML;
        var description = this.title;
        var value = this.value;
        var inputID = 'ui-multiselect-' + (this.id || id + '-option-' + i);
        var isDisabled = this.disabled;
        var isSelected = this.selected;
        var labelClasses = [ 'ui-corner-all' ];
        var liClasses = (isDisabled ? 'ui-multiselect-disabled ' : ' ') + this.className;
        var optLabel;

        // is this an optgroup?
        if(parent.tagName === 'OPTGROUP') {
          optLabel = parent.getAttribute('label');

          // has this optgroup been added already?
          if (isSelected) {
	          if($.inArray(optLabel, seletedOptgroups) === -1) {
					var newGroupId = seletedOptgroups.length + 1;
					selectedHtml += '<li rel="selected" data-group-id="'+newGroupId+'" class="ui-multiselect-optgroup-label ' + parent.className + '"><a href="#">' + optLabel + '</a></li>';
					seletedOptgroups.push(optLabel);			
		          }
          }
          else {
	          if($.inArray(optLabel, optgroups) === -1) {
				var newGroupId = optgroups.length + 1;
	            html += '<li data-group-id="'+newGroupId+'" class="ui-multiselect-optgroup-label ' + parent.className + '"><a href="#">' + optLabel + '</a></li>';
	            optgroups.push(optLabel);			
	          }
          }
        }
		leftOoptgroups = optgroups;
        if(isDisabled) {
          labelClasses.push('ui-state-disabled');
        }

        if (isSelected) {
 	        selectedHtml += self._getOptionHtml(seletedOptgroups, id, o.multiple, liClasses, inputID, description, labelClasses, value, title, isDisabled, true);

        }
        else {
        	html += self._getOptionHtml(optgroups, id, o.multiple, liClasses, inputID, description, labelClasses, value, title, isDisabled, false);
        }
      });

      // insert into the DOM
      checkboxContainer.html(html);
      selectedCheckboxContainer.html(selectedHtml);

      // cache some moar useful elements
	  //console.log(this);
      this.labels = menu.find('label');
      this.inputs = this.labels.children('input');
      
      this.selectedLabels = selectedMenu.find('label');
      this.selectedInputs = this.selectedLabels.children('input');

      // set widths
      this._setButtonWidth();
      //this._setMenuWidth();

      // remember default value
      this.button[0].defaultValue = this.update();

      // broadcast refresh event; useful for widgets
      if(!init) {
        this._trigger('refresh');
      }
    },
    
    _getOptionHtml: function(optgroups, id, multiple, liClasses, inputID, description, labelClasses, value, title, isDisabled, selected) {
    	var html = "";
    	var rel = "";
    	if (selected) rel = ' rel="selected" ';
        html += '<li data-group="'+optgroups.length+'" class="' + liClasses + '">';
    	
        // create the label
        html += '<label for="' + inputID + '" title="' + description + '" class="' + labelClasses.join(' ') + '"'+rel+'>';
        html += '<input id="' + inputID + '" name="multiselect_' + id + '" type="' + (multiple ? "checkbox" : "radio") + '" value="' + value + '" title="' + title + '"';


        // disabled?
        if(isDisabled) {
          html += ' disabled="disabled"';
          html += ' aria-disabled="true"';
        }

        // add the title and close everything off
        html += ' /><span>' + title + '</span></label></li>';

        return html;
    },

    // updates the button text. call refresh() to rebuild
    update: function() {
      var o = this.options;
      var $inputs = this.inputs;
      var $checked = $inputs.filter(':checked');
      var numChecked = $checked.length;
      var value;

      if(numChecked === 0) {
        value = o.noneSelectedText;
      } else {
        if($.isFunction(o.selectedText)) {
          value = o.selectedText.call(this, numChecked, $inputs.length, $checked.get());
        } else if(/\d/.test(o.selectedList) && o.selectedList > 0 && numChecked <= o.selectedList) {
          value = $checked.map(function() { return $(this).next().html(); }).get().join(', ');
        } else {
          value = o.selectedText.replace('#', numChecked).replace('#', $inputs.length);
        }
      }

      this._setButtonValue(value);

      return value;
    },

    // this exists as a separate method so that the developer 
    // can easily override it.
    _setButtonValue: function(value) {
      this.buttonlabel.text(value);
    },
    
    //bind shift button events
    _bindShiftButtons: function() {
        var self = this;
    	var shiftButtons = this.shiftButtons;
    	
    	shiftButtons.find('a').bind('click',function(){
			var index = $(shiftButtons).find('li').index($(this).parent());
			var $inputs = self.inputs;
			var $selectedInputs = self.selectedInputs;
			var selectedValues = [];
			var items = [];
			
			switch(index) {
				case 0 :
					if (typeof(console) != 'undefined') console.log('Processing move checked to selected');
					items = $inputs.filter(':checked');

					items.each(function(i) {
						var value = $(this).val();
						if (typeof(console) != 'undefined') console.log('    input value = ' + value + ", id " + $(this).attr('id'));
						selectedValues.push(value);
					});

					if (typeof(console) != 'undefined') console.log('    new selected values: ' + selectedValues);
					if(selectedValues.length > 0) {
						var el = self.element;
						var selectedList = selectedValues.concat(el.val());
						el.val(selectedList);
						self.refresh(true);
					}
				break;

				case 1 :
					if (typeof(console) != 'undefined') console.log('Processing move all to selected');
					items = $inputs;

					items.each(function(i) {
						var value = $(this).val();
						if (typeof(console) != 'undefined') console.log('    input value = ' + value + ", id " + $(this).attr('id'));
						selectedValues.push(value);
					});

					if (typeof(console) != 'undefined') console.log('    new selected values: ' + selectedValues);
					if(selectedValues.length > 0) {
						var el = self.element;
						var selectedList = selectedValues.concat(el.val());
						el.val(selectedList);
						self.refresh(true);
					}
				break;

				case 2 :
					if (typeof(console) != 'undefined') console.log('Processing move checked to available');
					items = $selectedInputs.filter(':not(:checked)');
					
					items.each(function(i) {
						var value = $(this).val();
						if (typeof(console) != 'undefined') console.log('    input value = ' + value + ", id " + $(this).attr('id'));
						selectedValues.push(value);
					});

					if (typeof(console) != 'undefined') console.log('    new selected values: ' + selectedValues);
					if(selectedValues.length > -1) {
						var el = self.element;
						el.val(selectedValues);
						self.refresh(true);
					}

				break;

				case 3 :
					if (typeof(console) != 'undefined') console.log('Processing move all to available');
					items = $selectedInputs;
					
					if(items.length > 0) {
						var el = self.element;
						el.val([]);
						self.refresh(true);
					}
				break;

			};
			
			
    	});
    },

    // binds events
    _bindEvents: function() {
      var self = this;
      var button = this.button;

      function clickHandler() {
        self[ self._isOpen ? 'close' : 'open' ]();
        return false;
      }

      // webkit doesn't like it when you click on the span :(
      button
        .find('span')
        .bind('click.multiselect', clickHandler);

      // button events
      button.bind({
        click: clickHandler,
        keypress: function(e) {
          switch(e.which) {
            case 27: // esc
              case 38: // up
              case 37: // left
              self.close();
            break;
            case 39: // right
              case 40: // down
              self.open();
            break;
          }
        },
        mouseenter: function() {
          if(!button.hasClass('ui-state-disabled')) {
            $(this).addClass('ui-state-hover');
          }
        },
        mouseleave: function() {
          $(this).removeClass('ui-state-hover');
        },
        focus: function() {
          if(!button.hasClass('ui-state-disabled')) {
            $(this).addClass('ui-state-focus');
          }
        },
        blur: function() {
          $(this).removeClass('ui-state-focus');
        }
      });

      // header links
	
      this.header.delegate('a', 'click.multiselect', function(e) {
        // close link
		
        if($(this).hasClass('ui-multiselect-close')) {
          self.close();

          // check all / uncheck all
        } else {
          self[$(this).hasClass('ui-multiselect-all') ? 'checkAll' : 'uncheckAll']();
			/*
			console.log(e);
			$checkVal = $(this).hasClass('ui-multiselect-all');			
			$inputs = $(this).parents().closest('.ui-widget-header').next('ul').find('input').prop('checked',$checkVal);
			console.log($inputs);
			*/
			
        }

        e.preventDefault();
      });

      // optgroup label toggle support
      this.menu.delegate('li.ui-multiselect-optgroup-label a', 'click.multiselect', function(e) {
    	  self._optionGroupClick(this, self, e);
      })
      .delegate('label', 'mouseenter.multiselect', function() {
    	  self._optionGroupLabelHover(this, self, false);
      })
      .delegate('label', 'keydown.multiselect', function(e) {
    	  self._optionGroupKeydown(this, self, e);
      })
      .delegate('input[type="checkbox"], input[type="radio"]', 'click.multiselect', function(e) {
    	  self._optionClick(this, self, e);
      });
      
      this.selectedMenu.delegate('li.ui-multiselect-optgroup-label a', 'click.multiselect', function(e) {
    	  self._optionGroupClick(this, self, e);
      })
      .delegate('label', 'mouseenter.multiselect', function() {
    	  self._optionGroupLabelHover(this, self, true);
      })
      .delegate('label', 'keydown.multiselect', function(e) {
    	  self._optionGroupKeydown(this, self, e);
      })
      .delegate('input[type="checkbox"], input[type="radio"]', 'click.multiselect', function(e) {
    	  self._optionClick(this, self, e);
      });

      // close each widget when clicking on any other element/anywhere else on the page
      $doc.bind('mousedown.' + this._namespaceID, function(e) {
        if(self._isOpen && !$.contains(self.menu[0], e.target) && !$.contains(self.button[0], e.target) && e.target !== self.button[0]) {
          self.close();
        }
      });

      // deal with form resets.  the problem here is that buttons aren't
      // restored to their defaultValue prop on form reset, and the reset
      // handler fires before the form is actually reset.  delaying it a bit
      // gives the form inputs time to clear.
      $(this.element[0].form).bind('reset.multiselect', function() {
        setTimeout($.proxy(self.refresh, self), 10);
      });
    },
    
    _optionGroupKeydown: function(entity, self, e) {
  	  if (typeof(console) != 'undefined') console.log('Processing label key down....');
      e.preventDefault();

      switch(e.which) {
        case 9: // tab
          case 27: // esc
          self.close();
        break;
        case 38: // up
          case 40: // down
          case 37: // left
          case 39: // right
          self._traverse(e.which, entity);
        break;
        case 13: // enter
          $(entity).find('input')[0].click();
        break;
      }
    	
    },
    
    _optionClick: function(entity, self, e){
  		if (typeof(console) != 'undefined') console.log('Processiong multiselect option click');

  		var $this = $(entity);
        var val = entity.value;
        var checked = entity.checked;
        var tags = self.element.find('option');

        // bail if this input is disabled or the event is cancelled
        if(this.disabled || self._trigger('click', e, { value: val, text: entity.title, checked: checked }) === false) {
          e.preventDefault();
          return;
        }

        // make sure the input has focus. otherwise, the esc key
        // won't close the menu after clicking an item.
        //$this.focus();

        // toggle aria state
        $this.attr('aria-selected', checked);

        // change state on the original option tags
//        tags.each(function() {
//          if(this.value === val) {
//            this.selected = checked;
//          } else if(!self.options.multiple) {
//            this.selected = false;
//          }
//        });

        // some additional single select-specific logic
//        if(!self.options.multiple) {
//          self.labels.removeClass('ui-state-active');
//          $this.closest('label').toggleClass('ui-state-active', checked);
//
//          // close menu
//          self.close();
//        }

//        // fire change on the select box
//        self.element.trigger("change");
//
//        // setTimeout is to fix multiselect issue #14 and #47. caused by jQuery issue #3827
//        // http://bugs.jquery.com/ticket/3827
//        setTimeout($.proxy(self.update, self), 10);
    	
    },
    
    _optionGroupClick: function(entity, self, e) {
  		if (typeof(console) != 'undefined') console.log('Processing group click....');

  		e.preventDefault();

        var $this = $(entity);
		
        var $inputs = $this.parent().nextUntil('li.ui-multiselect-optgroup-label').find('input:visible:not(:disabled)');
        var nodes = $inputs.get();
		if (typeof(console) != 'undefined') console.log('    nodes: '+nodes);

		var label = $this.parent().text();

        // trigger event and bail if the return is false
        if(self._trigger('beforeoptgrouptoggle', e, { inputs:nodes, label:label }) === false) {
          return;
        }

        // toggle inputs
        self._toggleChecked(
          $inputs.filter(':checked').length !== $inputs.length,
          $inputs
        );

        self._trigger('optgrouptoggle', e, {
          inputs: nodes,
          label: label,
          checked: nodes[0].checked
        });
   	
    },
    
    _optionGroupLabelHover: function(item, self, selected) {
  		//if (typeof(console) != 'undefined') console.log('Processing label hover....');
        if(!$(item).hasClass('ui-state-disabled')) {
        	if (selected)
        		self.selectedLabels.removeClass('ui-state-hover');
        	else
        		self.labels.removeClass('ui-state-hover');
        		
            $(item).addClass('ui-state-hover').find('input').focus();
          }
    	
    },

    // set button width
    _setButtonWidth: function() {
      var width = this.element.outerWidth();
      var o = this.options;

      if(/\d/.test(o.minWidth) && width < o.minWidth) {
        width = o.minWidth;
      }

      // set widths
      this.button.outerWidth(width);
    },

    // set menu width
    _setMenuWidth: function() {
      var m = this.menu;
      m.outerWidth(this.button.outerWidth());
    },

    // move up or down within the menu
    _traverse: function(which, start) {
    	
      if (typeof(console) != 'undefined') console.log('_traverse: ' + which + ", " + $(start).get(0).tagName + ' ' + $(start).attr('title'));
      
      var $start = $(start);
      var moveToLast = which === 38 || which === 37;

      // select the first li that isn't an optgroup label / disabled
      $next = $start.parent()[moveToLast ? 'prevAll' : 'nextAll']('li:not(.ui-multiselect-disabled, .ui-multiselect-optgroup-label)')[ moveToLast ? 'last' : 'first']();

      // if at the first/last element
      if(!$next.length) {
    	if ($start.attr('rel') == 'selected') {
    	    if (typeof(console) != 'undefined') console.log('    reach the last element');
	        var $container = this.selectedMenu.find('ul').last();
	    	
	        // move to the first/last
	        this.selectedMenu.find('label')[ moveToLast ? 'last' : 'first' ]().trigger('mouseover');
	
	        // set scroll position
	        $container.scrollTop(moveToLast ? $container.height() : 0);
    	}
    	else {
	        var $container = this.menu.find('ul').last();
	
	        // move to the first/last
	        this.menu.find('label')[ moveToLast ? 'last' : 'first' ]().trigger('mouseover');
	
	        // set scroll position
	        $container.scrollTop(moveToLast ? $container.height() : 0);
    	}
      } else {
        $next.find('label').trigger('mouseover');
      }
    },

    // This is an internal function to toggle the checked property and
    // other related attributes of a checkbox.
    //
    // The context of this function should be a checkbox; do not proxy it.
    _toggleState: function(prop, flag) {
      return function() {
        if(!this.disabled) {
          this[ prop ] = flag;
        }

        if(flag) {
          this.setAttribute('aria-selected', true);
        } else {
          this.removeAttribute('aria-selected');
        }
      };
    },

    _toggleChecked: function(flag, group) {
 
      var $inputs = (group && group.length) ?  group : $('.ui-multiselect-checkboxes').find('input');
      var self = this;

      // toggle state on inputs
      $inputs.each(this._toggleState('checked', flag));

      // give the first input focus
      $inputs.eq(0).focus();

      // update button text
      this.update();

      // gather an array of the values that actually changed
      var values = $inputs.map(function() {
        return this.value;
      }).get();

      // toggle state on original option tags
      this.element
        .find('option')
        .each(function() {
          if(!this.disabled && $.inArray(this.value, values) > -1) {
            self._toggleState('selected', flag).call(this);
          }
        });

      // trigger the change event on the select
      if($inputs.length) {
        this.element.trigger("change");
      }
    },

    _toggleDisabled: function(flag) {
      this.button.attr({ 'disabled':flag, 'aria-disabled':flag })[ flag ? 'addClass' : 'removeClass' ]('ui-state-disabled');

      var inputs = this.menu.find('input');
      var key = "ech-multiselect-disabled";

      if(flag) {
        // remember which elements this widget disabled (not pre-disabled)
        // elements, so that they can be restored if the widget is re-enabled.
        inputs = inputs.filter(':enabled').data(key, true)
      } else {
        inputs = inputs.filter(function() {
          return $.data(this, key) === true;
        }).removeData(key);
      }

      inputs
        .attr({ 'disabled':flag, 'arial-disabled':flag })
        .parent()[ flag ? 'addClass' : 'removeClass' ]('ui-state-disabled');

      this.element.attr({
        'disabled':flag,
        'aria-disabled':flag
      });
    },

    // open the menu
    open: function(e) {
      var self = this;
      var button = this.button;
      var menu = this.menu;
      var selectedMenu = this.selectedMenu;
      var speed = this.speed;
      var o = this.options;
      var args = [];

      if (typeof(console) != 'undefined') console.log('Open multiselect ');
//      if (typeof(console) != 'undefined') console.log('    1 available area style: ' + this.checkboxContainer.attr('style') + ', class: ' + this.checkboxContainer.attr('class'));
      
      // bail if the multiselectopen event returns false, this widget is disabled, or is already open
      if(this._trigger('beforeopen') === false || button.hasClass('ui-state-disabled') || this._isOpen) {
        return;
      }

      var $container = menu.find('ul').last();
      var $selectedContainer = selectedMenu.find('ul').last();
      var effect = o.show;

      // figure out opening effects/speeds
      if($.isArray(o.show)) {
        effect = o.show[0];
        speed = o.show[1] || self.speed;
      }

      // if there's an effect, assume jQuery UI is in use
      // build the arguments to pass to show()
      if(effect) {
        args = [ effect, speed ];
      }

      // set the scroll of the checkbox container
      $container.scrollTop(0).height(o.height);
      $selectedContainer.scrollTop(0).height(o.height);

      // positon
      this.position();

      // show the menu, maybe with a speed/effect combo
      $.fn.show.apply(menu, args);

      // select the first option
      // triggering both mouseover and mouseover because 1.4.2+ has a bug where triggering mouseover
      // will actually trigger mouseenter.  the mouseenter trigger is there for when it's eventually fixed
      this.labels.eq(0).trigger('mouseover').trigger('mouseenter').find('input').trigger('focus');

      button.addClass('ui-state-active');
      this._isOpen = true;
//      if (typeof(console) != 'undefined') console.log('    2 available area style: ' + this.checkboxContainer.attr('style') + ', class: ' + this.checkboxContainer.attr('class'));

      this._trigger('open');
    },

    // close the menu
    close: function() {
      if(this._trigger('beforeclose') === false) {
        return;
      }

      var o = this.options;
      var effect = o.hide;
      var speed = this.speed;
      var args = [];

      // figure out opening effects/speeds
      if($.isArray(o.hide)) {
        effect = o.hide[0];
        speed = o.hide[1] || this.speed;
      }

      if(effect) {
        args = [ effect, speed ];
      }

     // $.fn.hide.apply(this.menu, args);
    //  this.button.removeClass('ui-state-active').trigger('blur').trigger('mouseleave');
    //  this._isOpen = false;
    //  this._trigger('close');
    },

    enable: function() {
      this._toggleDisabled(false);
    },

    disable: function() {
      this._toggleDisabled(true);
    },

    checkAll: function(e) {
      this._toggleChecked(true);
      this._trigger('checkAll');
    },

    uncheckAll: function() {
      this._toggleChecked(false);
      this._trigger('uncheckAll');
    },

    getChecked: function() {
      return this.menu.find('input').filter(':checked');
    },

    destroy: function() {
      // remove classes + data
      $.Widget.prototype.destroy.call(this);

      // unbind events
      $doc.unbind(this._namespaceID);

      this.button.remove();
      this.menu.remove();
      this.selectedMenu.remove();
      this.element.show();

      return this;
    },

    isOpen: function() {
      return this._isOpen;
    },

    widget: function() {
      return this.menu;
    },

    getButton: function() {
      return this.button;
    },

    position: function() {
      var o = this.options;

      // use the position utility if it exists and options are specifified
      if($.ui.position && !$.isEmptyObject(o.position)) {
        o.position.of = o.position.of || button;

        this.menu
          .show()
          .position(o.position)
          .hide();

        // otherwise fallback to custom positioning
      } else {
        var pos = this.button.parent().offset();

        this.menu.css({
          top: pos.top + this.button.parent().outerHeight(),
          left: 'auto'
        });
      }
    },

    // react to option changes after initialization
    _setOption: function(key, value) {
      var menu = this.menu;
      var selectedMenu = this.selectedMenu

      switch(key) {
        case 'header':
          menu.find('div.ui-multiselect-header')[value ? 'show' : 'hide']();
          break;
        case 'checkAllText':
          menu.find('a.ui-multiselect-all span').eq(-1).text(value);
          break;
        case 'uncheckAllText':
          menu.find('a.ui-multiselect-none span').eq(-1).text(value);
          break;
        case 'height':
          menu.find('ul').last().height(parseInt(value, 10));
          selectedMenu.find('ul').last().height(parseInt(value, 10));
          if (typeof(console) != 'undefined') console.log('options: set height to ' + value);          
          if (typeof(console) != 'undefined') console.log('options: set height to ' + selectedMenu.find('ul'));          
          break;
        case 'minWidth':
          this.options[key] = parseInt(value, 10);
          this._setButtonWidth();
          this._setMenuWidth();
          break;
        case 'selectedText':
        case 'selectedList':
        case 'noneSelectedText':
          this.options[key] = value; // these all needs to update immediately for the update() call
          this.update();
          break;
        case 'classes':
          menu.add(this.button).removeClass(this.options.classes).addClass(value);
          break;
        case 'multiple':
          menu.toggleClass('ui-multiselect-single', !value);
          this.options.multiple = value;
          this.element[0].multiple = value;
          this.refresh();
          break;
        case 'position':
          this.position();
      }

      $.Widget.prototype._setOption.apply(this, arguments);
    }
  });

})(jQuery);
