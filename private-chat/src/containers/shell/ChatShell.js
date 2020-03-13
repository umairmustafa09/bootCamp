import React from 'react';
import { connect } from 'react-redux';

import {
	conversationChanged,
	newMessageAdded,
	conversationDeleted
} from '../../store/actions';
import ConversationList from '../../components/chat/conversation/conversation-list/ConversationList';
import ChatTitle from '../../components/chat/chat-title/ChatTitle';
import MessageList from '../../components/chat/message/MessageList';
import ChatForm from '../../components/chat/chat-form/Chat-Form';

import './ChatShell.css';

const ChatShell = ({
	conversations,
	selectedConversation,
	conversationChanged,
	onMessageSubmitted,
	onDeleteConversation
}) => {
	return (
		<div id="chat-container" className="wrapper">
			<ChatTitle
				selectedConversation={selectedConversation}
				onDeleteConversation={onDeleteConversation}
			/>
			<ConversationList
				onConversationItemSelected={conversationChanged}
				conversations={conversations}
				selectedConversationId={selectedConversation.id}
			/>

			<MessageList messages={selectedConversation.messages} />
			<ChatForm onMessageSubmitted={onMessageSubmitted} />
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		conversations: state.conversationState.conversations,
		selectedConversation: state.conversationState.selectedConversation
	};
};

const mapDispatchToProps = (dispatch) => ({
	conversationChanged: (conversationId) =>
		dispatch(conversationChanged(conversationId)),
	onMessageSubmitted: (messageText) => {
		dispatch(newMessageAdded(messageText));
	},
	onDeleteConversation: () => {
		dispatch(conversationDeleted());
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatShell);
