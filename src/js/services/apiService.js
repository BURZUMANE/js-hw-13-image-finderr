import PNotify from '../../../node_modules/pnotify/dist/es/PNotify';

export default {
    page:1,
    query: 'KYIV',
    baseUrl: 'https://pixabay.com/api/',
    key: '?key=16010994-0c285aac962bcd44e77124ee2',
    loader(){
        this.incrementPage();
        const requestParams = `&q=${this.query}&page=${this.page}&per_page=12`;
        return this.baseUrl + this.key + requestParams
    },
    fetchImages(){
        PNotify.closeAll();
        const requestParams = `&q=${this.query}&page=${this.page}&per_page=12`;
        return fetch(this.baseUrl + this.key + requestParams).then(
            response => {
                function showStackBottomRight(type) {
                    if (typeof window.stackBottomRight === 'undefined') {
                      window.stackBottomRight = {
                        'dir1': 'up',
                        'dir2': 'left',
                        'firstpos1': 25,
                        'firstpos2': 25
                      };
                    }
                    var opts = {
                      title: 'Over Here',
                      text: "Check me out. I'm in a different stack.",
                      stack: window.stackBottomRight
                    };
                    switch (type) {
                      case 'error':
                        opts.title = 'Oh No';
                        opts.text = 'Watch out for that water tower!';
                        opts.type = 'error';
                        break;
                      case 'info':
                        opts.title = 'Breaking News';
                        opts.text = 'Have you met Ted?';
                        opts.type = 'info';
                        break;
                      case 'success':
                        opts.title = 'Good News Everyone';
                        opts.text = "I've invented a device that bites shiny metal asses.";
                        opts.type = 'success';
                        break;
                    }
                    PNotify.alert(opts);
                  }
                showStackBottomRight('success');
                return response.json()}
        ).then(parsedResponse => {
            this.incrementPage()
            return parsedResponse.hits;
            
        });
    },
    get searchQuery(){
        return this.query;
        
    },
    
    set searchQuery(value){
        this.query = value;
    },
    incrementPage(){
        this.page +=1;
    },
    resetPage(){
        this.page =1;
    }
}

