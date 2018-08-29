webpackJsonp([0xad6d89112746],{732:function(e,t){e.exports={data:{post:{id:"/home/nahuel/code/personal/blog/content/posts/2018-08-29--aws-ec2-schedule-servers/index.md absPath of file >>> MarkdownRemark",html:'<p>Go to the AWS dashboard, and enter the IAM module. Then you need to create the following policy under the name <code class="language-text">ec2_start_stop_policy</code>.</p>\n<div class="gatsby-highlight" data-language="text">\n      <pre class="language-text"><code class="language-text">{\n    &quot;Version&quot;: &quot;2012-10-17&quot;,\n    &quot;Statement&quot;: [\n        {\n            &quot;Sid&quot;: &quot;Stmt1444812758000&quot;,\n            &quot;Effect&quot;: &quot;Allow&quot;,\n            &quot;Action&quot;: [\n                &quot;ec2:DescribeInstanceStatus&quot;,\n                &quot;ec2:DescribeInstances&quot;,\n                &quot;ec2:StartInstances&quot;,\n                &quot;ec2:StopInstances&quot;\n            ],\n            &quot;Resource&quot;: [\n                &quot;*&quot;\n            ]\n        },\n        {\n            &quot;Action&quot;: [\n                &quot;logs:CreateLogGroup&quot;,\n                &quot;logs:CreateLogStream&quot;,\n                &quot;logs:PutLogEvents&quot;\n            ],\n            &quot;Effect&quot;: &quot;Allow&quot;,\n            &quot;Resource&quot;: &quot;arn:aws:logs:*:*:*&quot;\n        }\n    ]\n}</code></pre>\n      </div>\n<p>Then create a IAM Role called <code class="language-text">ec2_start_stop_role</code>, that uses Lambda as a service, and assign the created policy.</p>\n<p>Create 2 lambda functions <code class="language-text">start-server</code> and <code class="language-text">stop-server</code>, with the following configuration:</p>\n<ul>\n<li><code class="language-text">Role</code>: <code class="language-text">ec2_start_stop_role</code></li>\n<li><code class="language-text">Memory</code>: <code class="language-text">128MB</code></li>\n<li><code class="language-text">Timeout</code>: <code class="language-text">59s</code></li>\n</ul>\n<p>In the code editor, enter the following content:</p>\n<div class="gatsby-highlight" data-language="text">\n      <pre class="language-text"><code class="language-text">import boto3\n# Enter the region your instances are in. Include only the region without specifying Availability Zone; e.g., &#39;us-east-1&#39;\nregion = &#39;XX-XXXXX-X&#39;\n# Enter your instances here: ex. [&#39;X-XXXXXXXX&#39;, &#39;X-XXXXXXXX&#39;]\ninstances = [&#39;X-XXXXXXXX&#39;]\n\ndef lambda_handler(event, context):\n    ec2 = boto3.client(&#39;ec2&#39;, region_name=region)\n    ec2.stop_instances(InstanceIds=instances)\n    print &#39;stopped your instances: &#39; + str(instances)</code></pre>\n      </div>\n<p>Change <code class="language-text">stop_instances</code> with <code class="language-text">start_instances</code> on the <code class="language-text">start-server</code> lambda.</p>\n<h2>Create a CloudWatch Event that triggers your Lambda function at night</h2>\n<ul>\n<li>\n<p>Add a trigger, select CloudWatch Events as a source.</p>\n</li>\n<li>\n<p>Create a new rule, and enter something like <code class="language-text">cron(0 1 * * ? *)</code> in the expression. That means that it will run every day at 1AM.</p>\n</li>\n<li>\n<p>Hit Save.</p>\n</li>\n</ul>\n<h2>Create a CloudWatch Event that triggers your Lambda function in the morning</h2>\n<ul>\n<li>\n<p>Add a trigger, select CloudWatch Events as a source.</p>\n</li>\n<li>\n<p>Create a new rule, and enter something like <code class="language-text">cron(0 8 * * ? *)</code> in the expression. That means that it will run every day at 8AM.</p>\n</li>\n<li>\n<p>Hit Save.</p>\n</li>\n</ul>',htmlAst:{type:"root",children:[{type:"element",tagName:"p",properties:{},children:[{type:"text",value:"Go to the AWS dashboard, and enter the IAM module. Then you need to create the following policy under the name "},{type:"element",tagName:"code",properties:{className:["language-text"]},children:[{type:"text",value:"ec2_start_stop_policy"}]},{type:"text",value:"."}]},{type:"text",value:"\n"},{type:"element",tagName:"div",properties:{className:["gatsby-highlight"],dataLanguage:"text"},children:[{type:"text",value:"\n      "},{type:"element",tagName:"pre",properties:{className:["language-text"]},children:[{type:"element",tagName:"code",properties:{className:["language-text"]},children:[{type:"text",value:'{\n    "Version": "2012-10-17",\n    "Statement": [\n        {\n            "Sid": "Stmt1444812758000",\n            "Effect": "Allow",\n            "Action": [\n                "ec2:DescribeInstanceStatus",\n                "ec2:DescribeInstances",\n                "ec2:StartInstances",\n                "ec2:StopInstances"\n            ],\n            "Resource": [\n                "*"\n            ]\n        },\n        {\n            "Action": [\n                "logs:CreateLogGroup",\n                "logs:CreateLogStream",\n                "logs:PutLogEvents"\n            ],\n            "Effect": "Allow",\n            "Resource": "arn:aws:logs:*:*:*"\n        }\n    ]\n}'}]}]},{type:"text",value:"\n      "}]},{type:"text",value:"\n"},{type:"element",tagName:"p",properties:{},children:[{type:"text",value:"Then create a IAM Role called "},{type:"element",tagName:"code",properties:{className:["language-text"]},children:[{type:"text",value:"ec2_start_stop_role"}]},{type:"text",value:", that uses Lambda as a service, and assign the created policy."}]},{type:"text",value:"\n"},{type:"element",tagName:"p",properties:{},children:[{type:"text",value:"Create 2 lambda functions "},{type:"element",tagName:"code",properties:{className:["language-text"]},children:[{type:"text",value:"start-server"}]},{type:"text",value:" and "},{type:"element",tagName:"code",properties:{className:["language-text"]},children:[{type:"text",value:"stop-server"}]},{type:"text",value:", with the following configuration:"}]},{type:"text",value:"\n"},{type:"element",tagName:"ul",properties:{},children:[{type:"text",value:"\n"},{type:"element",tagName:"li",properties:{},children:[{type:"element",tagName:"code",properties:{className:["language-text"]},children:[{type:"text",value:"Role"}]},{type:"text",value:": "},{type:"element",tagName:"code",properties:{className:["language-text"]},children:[{type:"text",value:"ec2_start_stop_role"}]}]},{type:"text",value:"\n"},{type:"element",tagName:"li",properties:{},children:[{type:"element",tagName:"code",properties:{className:["language-text"]},children:[{type:"text",value:"Memory"}]},{type:"text",value:": "},{type:"element",tagName:"code",properties:{className:["language-text"]},children:[{type:"text",value:"128MB"}]}]},{type:"text",value:"\n"},{type:"element",tagName:"li",properties:{},children:[{type:"element",tagName:"code",properties:{className:["language-text"]},children:[{type:"text",value:"Timeout"}]},{type:"text",value:": "},{type:"element",tagName:"code",properties:{className:["language-text"]},children:[{type:"text",value:"59s"}]}]},{type:"text",value:"\n"}]},{type:"text",value:"\n"},{type:"element",tagName:"p",properties:{},children:[{type:"text",value:"In the code editor, enter the following content:"}]},{type:"text",value:"\n"},{type:"element",tagName:"div",properties:{className:["gatsby-highlight"],dataLanguage:"text"},children:[{type:"text",value:"\n      "},{type:"element",tagName:"pre",properties:{className:["language-text"]},children:[{type:"element",tagName:"code",properties:{className:["language-text"]},children:[{type:"text",value:"import boto3\n# Enter the region your instances are in. Include only the region without specifying Availability Zone; e.g., 'us-east-1'\nregion = 'XX-XXXXX-X'\n# Enter your instances here: ex. ['X-XXXXXXXX', 'X-XXXXXXXX']\ninstances = ['X-XXXXXXXX']\n\ndef lambda_handler(event, context):\n    ec2 = boto3.client('ec2', region_name=region)\n    ec2.stop_instances(InstanceIds=instances)\n    print 'stopped your instances: ' + str(instances)"}]}]},{type:"text",value:"\n      "}]},{type:"text",value:"\n"},{type:"element",tagName:"p",properties:{},children:[{type:"text",value:"Change "},{type:"element",tagName:"code",properties:{className:["language-text"]},children:[{type:"text",value:"stop_instances"}]},{type:"text",value:" with "},{type:"element",tagName:"code",properties:{className:["language-text"]},children:[{type:"text",value:"start_instances"}]},{type:"text",value:" on the "},{type:"element",tagName:"code",properties:{className:["language-text"]},children:[{type:"text",value:"start-server"}]},{type:"text",value:" lambda."}]},{type:"text",value:"\n"},{type:"element",tagName:"h2",properties:{},children:[{type:"text",value:"Create a CloudWatch Event that triggers your Lambda function at night"}]},{type:"text",value:"\n"},{type:"element",tagName:"ul",properties:{},children:[{type:"text",value:"\n"},{type:"element",tagName:"li",properties:{},children:[{type:"text",value:"\n"},{type:"element",tagName:"p",properties:{},children:[{type:"text",value:"Add a trigger, select CloudWatch Events as a source."}]},{type:"text",value:"\n"}]},{type:"text",value:"\n"},{type:"element",tagName:"li",properties:{},children:[{type:"text",value:"\n"},{type:"element",tagName:"p",properties:{},children:[{type:"text",value:"Create a new rule, and enter something like "},{type:"element",tagName:"code",properties:{className:["language-text"]},children:[{type:"text",value:"cron(0 1 * * ? *)"}]},{type:"text",value:" in the expression. That means that it will run every day at 1AM."}]},{type:"text",value:"\n"}]},{type:"text",value:"\n"},{type:"element",tagName:"li",properties:{},children:[{type:"text",value:"\n"},{type:"element",tagName:"p",properties:{},children:[{type:"text",value:"Hit Save."}]},{type:"text",value:"\n"}]},{type:"text",value:"\n"}]},{type:"text",value:"\n"},{type:"element",tagName:"h2",properties:{},children:[{type:"text",value:"Create a CloudWatch Event that triggers your Lambda function in the morning"}]},{type:"text",value:"\n"},{type:"element",tagName:"ul",properties:{},children:[{type:"text",value:"\n"},{type:"element",tagName:"li",properties:{},children:[{type:"text",value:"\n"},{type:"element",tagName:"p",properties:{},children:[{type:"text",value:"Add a trigger, select CloudWatch Events as a source."}]},{type:"text",value:"\n"}]},{type:"text",value:"\n"},{type:"element",tagName:"li",properties:{},children:[{type:"text",value:"\n"},{type:"element",tagName:"p",properties:{},children:[{type:"text",value:"Create a new rule, and enter something like "},{type:"element",tagName:"code",properties:{className:["language-text"]},children:[{type:"text",value:"cron(0 8 * * ? *)"}]},{type:"text",value:" in the expression. That means that it will run every day at 8AM."}]},{type:"text",value:"\n"}]},{type:"text",value:"\n"},{type:"element",tagName:"li",properties:{},children:[{type:"text",value:"\n"},{type:"element",tagName:"p",properties:{},children:[{type:"text",value:"Hit Save."}]},{type:"text",value:"\n"}]},{type:"text",value:"\n"}]}],data:{quirksMode:!1}},fields:{slug:"/aws-ec2-schedule-servers/",prefix:"2018-08-29"},frontmatter:{title:"AWS - Schedule EC2 Shutdown and Startup",subTitle:"This way we dont pay unused hours",cover:{childImageSharp:{resize:{src:"/static/ec2-5c666f5eb996cc941d466180057bcc0f-160fa.png"}}}}},author:{id:"/home/nahuel/code/personal/blog/content/parts/author.md absPath of file >>> MarkdownRemark",html:'<p><strong>Mr. Gatsby</strong> Proin ornare ligula eu tellus tempus elementum. Aenean <a href="/">bibendum</a> iaculis mi, nec blandit lacus interdum vitae. Vestibulum non nibh risus, a scelerisque purus. :hearts:</p>'},footnote:{id:"/home/nahuel/code/personal/blog/content/parts/footnote.md absPath of file >>> MarkdownRemark",html:'<ul>\n<li>this is a demo site of the <a href="https://github.com/greglobinski/gatsby-starter-personal-blog">gatsby-starter-personal-blog</a></li>\n<li>built by <a href="https://www.greglobinski.com">greg lobinski</a></li>\n<li>GatsbyJS, ReactJs, CSS in JS - <a href="https://dev.greglobinski.com">Front-end web development with Greg</a></li>\n<li>deliverd by <a href="https://www.netlify.com/">Netlify</a></li>\n<li>photos by <a href="https://unsplash.com">unsplash.com</a></li>\n</ul>'},site:{siteMetadata:{facebook:{appId:""}}}},pathContext:{slug:"/aws-ec2-schedule-servers/"}}}});
//# sourceMappingURL=path---aws-ec-2-schedule-servers-77382c2c2ac508201db4.js.map