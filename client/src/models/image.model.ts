interface Image{
    idimage?:number,
    image_name:string,
    image_url:string,
    image_creation_date:Date,
    category?:Category,
    _:Person[]
}