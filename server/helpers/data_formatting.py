def format_data(data):
	formatted_data = {}

	tenants = {tenant['id']: tenant for tenant in data['tenants']}
	property_payments = data['payments']

	for payment in property_payments:
		payment_date = payment['payment_date']
		for tenant_id, amount in payment.items():
			if tenant_id.startswith('tenant_'):
				tenant_id = int(tenant_id.split('_')[1])
				tenant = tenants.get(tenant_id, {})
				if tenant:
					property_name = tenant.get('property_name')
					tenant_name = tenant.get('name')
					if property_name not in formatted_data:
						formatted_data[property_name] = {}
					if tenant_name not in formatted_data[property_name]:
						formatted_data[property_name][tenant_name] = [{
								'payment_date': payment_date,
								'amount': amount or 0
						}]
					else:
						formatted_data[property_name][tenant_name].append({
								'payment_date': payment_date,
								'amount': amount or 0
						})

	return formatted_data
