const ClientModel = require('../Models/ClientModel');
const isAuthor = async (req, res, next) => {
	const authorId = req.user._id;
	const { clientId } = req.params;

	const client = await ClientModel.findById(clientId);

	if (!client.author.equals(authorId)) {
		return res.status(401).json({
			success: false,
			error: 'Unauthorized Action',
			msg: 'Only client author can do this action',
		});
	}
	next();
};

module.exports = isAuthor;
