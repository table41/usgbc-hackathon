#!/bin/env ruby

Dir.chdir('/home/ec2-user/api')

`del usgbc.zip`
`pip install geopy -t .`
`zip usgbc.zip -r .`

lambda = Aws::Lambda::Client.new(region: 'us-west-2')

Dir.glob('*.py').each do |file|
  function_name = file.split('.')[0]
  handler = lambda.get_function_configuration(function_name: 'getUserScore').handler
  unless handler == "#{function_name}.lambda_handler"
    lambda.update_function_configuration(function_name: function_name, handler: "#{function_name}.lambda_handler")
    puts "Updated handler on #{function_name}"
  end
  lambda.update_function_code(function_name: function_name, zip_file: File.read('usgbc.zip'))
  puts "Updated code on #{function_name}"
end
