const initialState = {
	conversations: [
		{
			id: '1',
			imageUrl: require('../../images/profiles/img1.png'),
			imageAlt: 'Daryl Duckmanton',
			title: 'Daryl Duckmanton',
			createdAt: '2020-3-13 11:25',
			latestMessageText: 'This is a message',
			messages: [
				{
					imageUrl: null,
					imageAlt: null,
					messageText: 'Ok then',
					createdAt: '2020-3-13 11:25',
					isMyMessage: true
				},
				{
					imageUrl: require('../../images/profiles/img1.png'),
					imageAlt: 'Daryl Duckmanton',
					messageText: `
                        Yeah I think it's best we do that. Otherwise things won't work well at all. 
                        I'm adding more text here to test the sizing of the speech bubble and the 
                        wrapping of it too.
                    `,
					createdAt: '2020-3-13 11:25',
					isMyMessage: false
				},
				{
					imageUrl: null,
					imageAlt: null,
					messageText: "Maybe we can use Jim's studio.",
					createdAt: '2020-3-13 11:25',
					isMyMessage: true
				},
				{
					imageUrl: require('../../images/profiles/img1.png'),
					imageAlt: 'Daryl Duckmanton',
					messageText: `
                        All I know is where I live it's too hard
                        to record because of all the street noise.
                    `,
					createdAt: '2020-3-13 11:25',
					isMyMessage: false
				},
				{
					imageUrl: null,
					imageAlt: null,
					messageText: `
                        Well we need to work out sometime soon where
                        we really want to record our video course.
                    `,
					createdAt: '2020-3-13 11:25',
					isMyMessage: true
				},
				{
					imageUrl: require('../../images/profiles/img1.png'),
					imageAlt: 'Daryl Duckmanton',
					messageText: `
                        I'm just in the process of finishing off the
                        last pieces of material for the course.
                    `,
					createdAt: '2020-3-13 11:25',
					isMyMessage: false
				},
				{
					imageUrl: null,
					imageAlt: null,
					messageText: "How's it going?",
					createdAt: '2020-3-13 11:25',
					isMyMessage: true
				},
				{
					imageUrl: require('../../images/profiles/img1.png'),
					imageAlt: 'Daryl Duckmanton',
					messageText: " Hey mate what's up?",
					createdAt: '2020-3-13 11:25',
					isMyMessage: false
				},
				{
					imageUrl: null,
					imageAlt: null,
					messageText: 'Hey Daryl?',
					createdAt: '2020-3-13 11:25',
					isMyMessage: true
				}
			]
		},
		{
			id: '2',
			imageUrl: require('../../images/profiles/img2.png'),
			imageAlt: "Kim O'Neil",
			title: "Kim O'Neil",
			createdAt: '2020-3-13 11:25',
			latestMessageText: 'Ok fair enough. Well good talking to you.',
			messages: [
				{
					imageUrl: null,
					imageAlt: null,
					messageText: 'Ok fair enough. Well good talking to you.',
					createdAt: '2020-3-13 11:25',
					isMyMessage: true
				},
				{
					imageUrl: require('../../images/profiles/img2.png'),
					imageAlt: "Kim O'Neil",
					messageText: `
                        Not sure exactly yet. It will be next year sometime. Probably late.
                    `,
					createdAt: '2020-3-13 11:25',
					isMyMessage: false
				},
				{
					imageUrl: null,
					imageAlt: null,
					messageText: 'Yeah I know. But oh well. So when is the big date?',
					createdAt: '2020-3-13 11:25',
					isMyMessage: true
				},
				{
					imageUrl: require('../../images/profiles/img2.png'),
					imageAlt: "Kim O'Neil",
					messageText: `
                        Well I know you like doing that stuff. But honestly I think
                        you are already really talented. It's a shame you haven't found
                        what you are looking for yet.
                    `,
					createdAt: '2020-3-13 11:25',
					isMyMessage: false
				},
				{
					imageUrl: null,
					imageAlt: null,
					messageText: `
                        I'm doing ok. Just working on building some applications to
                        bulk up my resume, so I can get a better job.
                    `,
					createdAt: '2020-3-13 11:25',
					isMyMessage: true
				},
				{
					imageUrl: require('../../images/profiles/img2.png'),
					imageAlt: "Kim O'Neil",
					messageText: `
                        I've just been really busy at work myself, looking to get
                        married sometime next year too. How are you going?
                    `,
					createdAt: '2020-3-13 11:25',
					isMyMessage: false
				},
				{
					imageUrl: null,
					imageAlt: null,
					messageText: 'Yes it has been a little while',
					createdAt: '2020-3-13 11:25',
					isMyMessage: true
				},
				{
					imageUrl: require('../../images/profiles/img2.png'),
					imageAlt: "Kim O'Neil",
					messageText: 'Hey!!!! Have not spoken to you for a while',
					createdAt: '2020-3-13 11:25',
					isMyMessage: false
				},
				{
					imageUrl: null,
					imageAlt: null,
					messageText: 'Hi Kim?',
					createdAt: '2020-3-13 11:25',
					isMyMessage: true
				}
			]
		},
		{
			id: '3',
			imageUrl: require('../../images/profiles/img3.jpg'),
			imageAlt: 'John Anderson',
			title: 'John Anderson',
			createdAt: '2020-3-13 11:25',
			latestMessageText: 'Yes I love how Python does that',
			messages: [
				{
					imageUrl: null,
					imageAlt: null,
					messageText: 'Hi',
					createdAt: '2020-3-13 11:25',
					isMyMessage: true
				}
			]
		},
		{
			id: '4',
			imageUrl: require('../../images/profiles/img1.png'),
			imageAlt: 'Ben Smith',
			title: 'Ben Smith',
			createdAt: '2020-3-13 11:25',
			latestMessageText: 'Yeah Miami Heat are done',
			messages: [
				{
					imageUrl: null,
					imageAlt: null,
					messageText: 'Hi',
					createdAt: '2020-3-13 11:25',
					isMyMessage: true
				}
			]
		},
		{
			id: '5',
			imageUrl: require('../../images/profiles/img2.png'),
			imageAlt: 'Douglas Johannasen',
			title: 'Douglas Johannasen',
			createdAt: '2020-3-13 11:25',
			latestMessageText: 'No it does not',
			messages: [
				{
					imageUrl: null,
					imageAlt: null,
					messageText: 'Hi',
					createdAt: '2020-3-13 11:25',
					isMyMessage: true
				}
			]
		},
		{
			id: '6',
			imageUrl: require('../../images/profiles/img2.png'),
			imageAlt: 'Jacob Manly',
			title: 'Jacob Manly',
			createdAt: '2020-3-13 11:25',
			latestMessageText: 'Just be very careful doing that',
			messages: [
				{
					imageUrl: null,
					imageAlt: null,
					messageText: 'Hi',
					createdAt: '2020-3-13 11:25',
					isMyMessage: true
				}
			]
		},
		{
			id: '7',
			imageUrl: require('../../images/profiles/img2.png'),
			imageAlt: 'Stacey Wilson',
			title: 'Stacey Wilson',
			createdAt: '2020-3-13 11:25',
			latestMessageText: 'Awesome!!! Congratulations!!!!',
			messages: [
				{
					imageUrl: null,
					imageAlt: null,
					messageText: 'Hi',
					createdAt: '2020-3-13 11:25',
					isMyMessage: true
				}
			]
		},
		{
			id: '8',
			imageUrl: require('../../images/profiles/img2.png'),
			imageAlt: 'Stan George',
			title: 'Stan George',
			createdAt: '2020-3-13 11:25',
			latestMessageText: 'Good job',
			messages: [
				{
					imageUrl: null,
					imageAlt: null,
					messageText: 'Hi',
					createdAt: '2020-3-13 11:25',
					isMyMessage: true
				}
			]
		},
		{
			id: '9',
			imageUrl: require('../../images/profiles/img2.png'),
			imageAlt: 'Amely Momes',
			title: 'Amely Momes',
			createdAt: '2020-3-13 11:25',
			latestMessageText: 'Thank you. I appreciate that.',
			messages: [
				{
					imageUrl: null,
					imageAlt: null,
					messageText: 'Hi',
					createdAt: '2020-3-13 11:25',
					isMyMessage: true
				}
			]
		}
	],
	selectedConversation: {}
};

initialState.selectedConversation = initialState.conversations[0];

const conversationsReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SELECTED_CONVERSATION_CHANGED': {
			const newState = { ...state };
			newState.selectedConversation = newState.conversations.find(
				(conversation) => conversation.id === action.conversationId
			);

			return newState;
		}
		case 'DELETE_CONVERSATION': {
			const newState = { ...state };
			let selectedConversationIndex = newState.conversations.findIndex(
				(c) => c.id === newState.selectedConversation.id
			);
			newState.conversations.splice(selectedConversationIndex, 1);

			if (newState.conversations.length > 0) {
				if (selectedConversationIndex > 0) {
					--selectedConversationIndex;
				}

				newState.selectedConversation =
					newState.conversations[selectedConversationIndex];
			} else {
				newState.selectedConversation = null;
			}

			return newState;
		}
		case 'NEW_MESSAGE_ADDED': {
			const newState = { ...state };
			newState.selectedConversation = { ...newState.selectedConversation };
			const today = new Date();

			newState.selectedConversation.messages.unshift({
				imageUrl: null,
				imageAlt: null,
				messageText: action.textMessage,
				createdAt:
					today.getFullYear() +
					'-' +
					(today.getMonth() + 1) +
					'-' +
					today.getDate() +
					' ' +
					today.getHours() +
					':' +
					today.getMinutes(),
				isMyMessage: true
			});

			return newState;
		}
		default:
			return state;
	}
};

export default conversationsReducer;
