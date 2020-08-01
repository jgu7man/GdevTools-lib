export class MessengerModel  {
    constructor (
        public page_id: any,
        public theme_color?: string,
        public logged_in_greeting?: string,
        public logged_out_greeting?: string
    ) {
        
    }
}