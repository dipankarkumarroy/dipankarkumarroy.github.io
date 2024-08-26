function openNav() {
    document.getElementById("mySidepanel").style.width = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidepanel").style.width = "0";
  }
  
  function loadXMLComponent(position,postId) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById(position).innerHTML =this.responseText;
      }
    };
    xhttp.open("GET", postId, true);
    xhttp.send();
  }

/*window.addEventListener("hashchange", function(e) {
    if(e.oldURL.length > e.newURL.length)
        alert("want to back?")
});*/

class Stack {
  constructor() {
    this.items = [];
  }

  // Add an element to the stack
  push(item) {
    this.items.push(item);
    document.getElementById("back-btn").style.display = "true";
  }

  // Remove and return the top element from the stack
  pop() {
    if (this.isEmpty()) {
      return "Stack is empty";
    }
    
    return this.items.pop();
  }

  // Return the top element of the stack without removing it
  peek() {
    if (this.isEmpty()) {
      return "Stack is empty";
    }
    return this.items[this.items.length - 1];
  }

  // Check if the stack is empty
  isEmpty() {
    return this.items.length === 0;
  }

  // Return the size of the stack
  size() {
    return this.items.length;
  }

  // Clear the stack
  clear() {
    this.items = [];
  }
}

const back = new Stack();

function loadXMLContent(position,postId) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById(position).innerHTML =this.responseText;
      if(back.isEmpty()){back.push(postId); document.getElementById('back-btn').innerHTML =''}else if(back.peek()!=postId){document.getElementById('back-btn').innerHTML = `<button class="solid-button" onclick="back.pop(); loadXMLContent('post','`+back.peek()+`'); back.pop();">&#8619;</button>`;
       back.push(postId);}
    }
  };
  xhttp.open("GET", postId, true);
  xhttp.send();
}

function loadEx(position,postId) {

          // Fetch external content using crossorigin.me as a proxy
          fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(postId)}`)
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              return response.text();
          })
          .then(html => {
              // Insert the HTML into the specified element
              document.getElementById(position).innerHTML = html;
          })
          .catch(error => console.error('Error loading external content:', error));
}





//Load PDF using tag: <pdf-viewer src="compressed.tracemonkey-pldi-09.pdf"></pdf-viewer>

const template = document.createElement('template');
template.innerHTML = `
  <iframe frameborder="0" 
    width="100%" 
    height="900">
  </iframe>
`

class PdfViewer extends HTMLElement {
  constructor() {
    super()
    const shadowRoot = this.attachShadow({mode: 'open'})
    shadowRoot.appendChild(template.content.cloneNode(true))
  }
  get observedAttributes() {
    return ['src']
  }
  connectedCallback() {
    this.updateIframeSrc()
  }
  attributeChangedCallback(name) {
    if (['src', 'viewerPath'].includes(name)) {
      this.updateIframeSrc()
    }
  }
  updateIframeSrc() {
    this.shadowRoot.querySelector('iframe').setAttribute(
      'src',
      `${this.getAttribute('src') || ''}` 
      //`https://mozilla.github.io/pdf.js/web/viewer.html?file=${this.getAttribute('src') || ''}`
    )
  }
}
window.customElements.define('pdf-viewer', PdfViewer)