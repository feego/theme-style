/**
 *
 * Registration of polymer theme-style custom element.
 * ECMAScript 6 - using BabelJS traspiler.
 */
 Polymer('theme-style', {
 	id: 'theme-style',
 	attached() {
 		if (!this.textContent) {
 			return
 		}
 		this.provideContent()
 		this.require()
 	},
 	provideContent() {
 		this.createShadowRoot()
 		this.domObserver = new MutationObserver(this.domModified.bind(this))
 		.observe(this.shadowRoot, {subtree: true,
 			characterData: true, childList: true})
 		this.ensureTemplate()
 		this.shadowRoot.textContent = ''
 		this.shadowRoot.appendChild(this.instanceTemplate(this.template))
 		this.cssText = this.shadowRoot.textContent
 	},
 	ensureTemplate() {
 		if (!this.template) {
 			this.template = this.querySelector('template:not([repeat]):not([bind])');
	      // move content into the template
	      if (!this.template) {
	      	this.template = document.createElement('template');
	      	var n = this.firstChild;
	      	while (n) {
	      		this.template.content.appendChild(n.cloneNode(true));
	      		n = n.nextSibling;
	      	}
	      }
	  }
	},
	domModified: function() {
		this.cssText = this.shadowRoot.textContent;
		// this.notify();
	},
	require: function() {
		if (this.cssText) {
			this.ensureStyleElement();
			// do nothing if cssText has not changed
			if (this.styleElement._cssText === this.cssText) {
				return;
			}
			this.styleElement._cssText = this.cssText;
			if (window.ShadowDOMPolyfill) {
				this.styleElement.textContent = this.cssText;
				this.cssText = WebComponents.ShadowCSS.shimStyle(this.styleElement,
					this.getScopeSelector());
			}
			this.styleElement.textContent = this.cssText;
		}
	},
	ensureStyleElement: function() {
		if (!this.styleElement) {
			this.styleElement = window.ShadowDOMPolyfill ? 
			this.makeShimStyle() :
			this.makeRootStyle();
		}
		if (!this.styleElement) {
			console.warn(this.localName, 'could not setup style.');
		}
	},
	makeRootStyle: function() {
		var style = document.createElement('style');
		this.appendChild(style);
		return style;
	},

	makeShimStyle: function() {
		var host = this.findHost(this);
		if (host) {
			var name = host.localName;
			var style = document.querySelector('style[' + name + '=' + this.id +']');
			if (!style) {
				style = document.createElement('style');
				style.setAttribute(name, this.id);
				document.head.appendChild(style);
			}
			return style;
		}
	},
	getScopeSelector: function() {
		if (!this._scopeSelector) {
			var selector = '', host = this.findHost(this);
			if (host) {
				var typeExtension = host.hasAttribute('is');
				var name = typeExtension ? host.getAttribute('is') : host.localName;
				selector = WebComponents.ShadowCSS.makeScopeSelector(name, 
					typeExtension);
			}
			this._scopeSelector = selector;
		}
		return this._scopeSelector;
	},
	findHost: function(node) {
		while (node.parentNode) {
			node = node.parentNode;
		}
		return node.host || wrap(document.documentElement);
	}
})