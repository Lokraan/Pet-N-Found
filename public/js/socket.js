var SocketConnection = function(namespace) {
   this.url = window.location.origin;
   this.namespace = '/' + namespace ? namespace : '';
   this.connect = () => {
      this.socket = io(this.url + this.namespace);
      return this.socket;
   };
};