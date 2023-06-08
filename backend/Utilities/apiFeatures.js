const CONSTANT_LITERALS = require('../Constants/Constants');

class APIFeatures {
	constructor(query, queryStr) {
		this.query = query;
		this.queryStr = queryStr;
	}

	search() {
		const keyword = this.queryStr.keyword
			? {
					$or: [
						{
							name: {
								$regex: this.queryStr.keyword,
								$options: 'i',
							},
						},
						{
							address: {
								$regex: this.queryStr.keyword,
								$options: 'i',
							},
						},
					],
			  }
			: {};

		this.query = this.query.find({ ...keyword });

		return this;
	}

	filter() {
		const query = this.setFilterFields();

		this.query = this.query.find(query);
		return this;
	}

	pagination(resPerPage) {
		const currentPage = Number(this.queryStr.page) || 1;
		const skip = resPerPage * (currentPage - 1);

		this.query = this.query.limit(resPerPage).skip(skip);
		return this;
	}

	async filteredCount(authorObj) {
		const keyword = this.queryStr.keyword
			? {
					$or: [
						{
							name: {
								$regex: this.queryStr.keyword,
								$options: 'i',
							},
						},
						{
							address: {
								$regex: this.queryStr.keyword,
								$options: 'i',
							},
						},
					],
			  }
			: {};

		const query = this.setFilterFields();

		const countQuery = this.query.model
			.find(authorObj)
			.find(query)
			.find(keyword)
			.countDocuments();

		const count = await countQuery;
		return count;
	}

	setFilterFields() {
		const query = { ...this.queryStr };

		const removeFields = ['keyword', 'page', 'limit'];
		removeFields.forEach((el) => delete query[el]);

		if (
			query.hasOwnProperty('minBudget') &&
			query.hasOwnProperty('maxBudget')
		) {
			const minBudget =
				query.minBudget <= query.maxBudget
					? query.minBudget
					: query.maxBudget;
			const maxBudget = query.maxBudget;

			delete query.minBudget;
			delete query.maxBudget;

			const _maxBudget =
				query.clientType === CONSTANT_LITERALS.CLIENT_TYPE.RENT
					? CONSTANT_LITERALS.VALUES.MAX_RENT_BUDGET
					: query.clientType === CONSTANT_LITERALS.CLIENT_TYPE.SALE
					? CONSTANT_LITERALS.VALUES.MAX_SALE_BUDGET
					: null;

			const budgetObj =
				+minBudget === _maxBudget && +maxBudget === _maxBudget
					? { $gte: +minBudget }
					: { $gte: +minBudget, $lte: +maxBudget };

			query.budget = budgetObj;
		}

		if (
			query.hasOwnProperty('minArea') &&
			query.hasOwnProperty('maxArea')
		) {
			const minArea = query.minArea;
			const maxArea = query.maxArea;

			delete query.minArea;
			delete query.maxArea;

			const _maxArea = CONSTANT_LITERALS.VALUES.MAX_AREA;

			const areaObj =
				+minArea === _maxArea && +maxArea === _maxArea
					? { $gte: +minArea }
					: { $gte: +minArea, $lte: +maxArea };

			query.area = areaObj;
		}

		if (query.hasOwnProperty('leadAgentName')) {
			const leadAgentName = query.leadAgentName;
			delete query.leadAgentName;

			const leadAgentNameObj = {
				$regex: leadAgentName,
				$options: 'i',
			};

			query.leadAgentName = leadAgentNameObj;
		}

		return query;
	}
}

module.exports = APIFeatures;
