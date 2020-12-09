export class addVacations{
    public constructor(
        public description?: string,
        public  destination?: string,
        public startDate?: string,
        public  endDate?:string,
        public  price?: number,
        public image?:{},
        // public id?: number,
        // public isFollowed?:boolean,
    ){}        
}
