class Musique{
    constructor(id, photo, music, itune, title, name){
        this.id = id
        this.photo = photo
        this.music = music
        this.itune = itune
        this.title = title
        this.name = name
    }
    
    getTitle(){return this.title;}
    getPhoto(){return this.photo;}
    getMusic(){return this.music;}
    getItune(){return this.itune;}
    getName(){return this.name;}
    getId(){return this.id;}

}