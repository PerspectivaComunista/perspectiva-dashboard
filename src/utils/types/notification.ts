type Notification = {
	id: string;
	title: string;
	body: string;
	sentAt: string;
	sentToIds: string[];
	sentToTokens: string[];
};

export default Notification;
