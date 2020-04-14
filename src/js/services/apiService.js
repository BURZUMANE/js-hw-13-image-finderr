import PNotify from '../../../node_modules/pnotify/dist/es/PNotify';

export default {
    page:1,
    query: 'cats',
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
        console.log(requestParams);
        return fetch(this.baseUrl + this.key + requestParams).then(
            response => {
                PNotify.success({
                    title: 'Success!',
                    text: 'That thing that you were trying to do worked.',
                    animateSpeed: 'fast'
                  });
                  
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

