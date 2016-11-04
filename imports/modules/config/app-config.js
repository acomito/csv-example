import { Meteor } from 'meteor/meteor';


export const appConfig = {
	//app
	appName: Meteor.settings.public.config.appName,
	appDescription: 'Find the right salesperson in five minutes.',
	//support
	supportEmail: Meteor.settings.public.config.supportEmail,
	supportName: Meteor.settings.public.config.supportName,
};