export class Vacation{
    public constructor(
        public description?: string,
        public  destination?: string,
        public startDate?: string,
        public  endDate?:string,
        public  price?: number,
        public image?:any,
        public id?: number,
        public isFollowed?:boolean,
    ){}        
}
