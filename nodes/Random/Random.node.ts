import {
	INodeType,
	INodeTypeDescription,
	IExecuteFunctions,
	INodeExecutionData,
} from 'n8n-workflow';

export class Random implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Random',
		name: 'random',
		icon: 'file:random.svg',
		group: ['transform'],
		version: 1,
		description: 'Generates a True Random Number',
		defaults: {
			name: 'Random',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			{
				displayName: 'Min',
				name: 'min',
				type: 'number',
				default: 0,
				required: true,
			},
			{
				displayName: 'Max',
				name: 'max',
				type: 'number',
				default: 0,
				required: true,
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const minValue = this.getNodeParameter('min', 0) as number;
		const maxValue = this.getNodeParameter('max', 0) as number;

		const options = {
			method: 'GET' as const,
			url: `https://www.random.org/integers/?num=1&min=${minValue}&max=${maxValue}&col=1&base=10&format=plain&rnd=new`,
		};
		const responseData = await this.helpers.httpRequest(options);
		const value = (responseData as string).trim();

		return [
			[
				{
					json: {
						value,
					},
				},
			],
		];
	}
}
