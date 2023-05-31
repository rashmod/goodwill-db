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
		const queryCopy = { ...this.queryStr };

		const removeFields = ['keyword', 'page', 'limit'];
		removeFields.forEach((el) => delete queryCopy[el]);

		let queryStr = JSON.stringify(queryCopy);
		queryStr = queryStr.replace(
			/\b(gt|gte|lt|lte)\b/g,
			(match) => `$${match}`
		);

		this.query = this.query.find(JSON.parse(queryStr));
		return this;
	}

	pagination(resPerPage) {
		const currentPage = Number(this.queryStr.page) || 1;
		const skip = resPerPage * (currentPage - 1);

		this.query = this.query.limit(resPerPage).skip(skip);
		return this;
	}

	async filteredCount() {
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

		const query = { ...this.queryStr };

		const removeFields = ['keyword', 'page', 'limit'];
		removeFields.forEach((el) => delete query[el]);

		let queryStr = JSON.stringify(query);
		queryStr = queryStr.replace(
			/\b(gt|gte|lt|lte)\b/g,
			(match) => `$${match}`
		);

		const countQuery = this.query.model
			.find(JSON.parse(queryStr))
			.find(keyword)
			.countDocuments();

		const count = await countQuery;
		return count;
	}
}

module.exports = APIFeatures;
