var SocketConnection = function() {
   this.url = window.location.origin;
   this.connect = () => {
      this.socket = io(this.url);
      return this.socket;
   };
};