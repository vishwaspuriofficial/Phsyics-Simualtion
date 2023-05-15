// web component
class Header extends HTMLElement {
  
    // connect component
    connectedCallback() {
      this.innerHTML = 'Hello, World!';
    }
    
  }
  
  // register component
  customElements.define( 'Header', Header );