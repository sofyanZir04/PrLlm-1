import React from 'react';
import BMCGenerator from './BMCGenerator';
function Pricing() {
  const pricingTiers = [
    {
      name: 'Basic',
      price: 9.99,
      features: ['Business Model Generation', 'Estimation', 'Plan'],
    },
    {
      name: 'Premium',
      price: 19.99,
      features: ['Business Model Generation', 'Estimation', 'Plan', 'PDF Download', 'Priority Support'],
    },
    {
      name: 'Enterprise',
      price: 49.99,
      features: ['Business Model Generation', 'Estimation', 'Plan', 'PDF Download', 'Priority Support', 'Customized Solution'],
    },
  ];
  const BBmcData = {
    "keyPartners": {
      "explanation": "These are external entities that collaborate to achieve your business objectives.",
      "keyElements": [
        "Strategic Alliances: Partner with sites or platforms that cater to startups and entrepreneurs, such as [Startups.com](https://www.startups.com/), [TechCrunch](https://techcrunch.com/), or [AngelList](https://angel.list/)",
        "Content Partnerships: Collaborate with content creators or influencers in the business and startup space to reach a wider audience and establish thought leadership.",
        "Technology Providers: Partner with providers of AI and machine learning technologies (like Google Cloud Platform, AWS, or Azure) to enhance your BMC generation capabilities."
      ]
    },
    "keyActivities": {
      "explanation": "These are the essential actions your business undertakes to deliver its value proposition.",
      "keyElements": [
        "BMC Generation: Develop and refine algorithms and models that can effectively generate BMCs based on user input.",
        "Platform Development: Build a user-friendly platform or tool that allows customers to easily input their information and receive customized BMCs.",
        "Customer Support: Provide excellent customer support through channels like text chat to assist users and address any questions or issues.",
        "Marketing and Sales: Implement effective marketing strategies to attract potential customers and promote your BMC generation service."
      ]
    },
    "valueProposition": {
      "explanation": "This is the unique solution you offer to your customers that solves their problems or satisfies their needs.",
      "keyElements": [
        "Time-Saving: Help customers quickly and easily create comprehensive BMCs without extensive manual effort.",
        "Customization: Offer personalized BMCs tailored to each customer's specific business idea and goals.",
        "Clarity and Structure: Provide a clear and structured framework for customers to visualize and understand their business model.",
        "Expert Guidance: Incorporate insights and best practices from experienced entrepreneurs and business professionals."
      ]
    },
    "customerRelationships": {
      "explanation": "This describes the type of relationship you aim to build with your customers.",
      "keyElements": [
        "Text Chat Support: Offer responsive and personalized text chat support to address customer inquiries and provide assistance.",
        "Community Building: Foster a community of users who can share experiences, learn from each other, and provide feedback.",
        "Knowledge Sharing: Regularly share valuable content and resources related to business planning and BMC creation."
      ]
    },
    "customerSegments": {
      "explanation": "These are the groups of people or organizations that your business aims to serve.",
      "keyElements": [
        "Startups: Early-stage businesses seeking to validate and refine their business concepts.",
        "Entrepreneurs: Individuals with innovative ideas looking to launch new ventures.",
        "Small Businesses: Established businesses aiming to expand or pivot their operations."
      ]
    },
    "keyResources": {
      "explanation": "These are the assets that your business needs to operate effectively.",
      "keyElements": [
        "Development Team: Skilled developers with expertise in AI, machine learning, and software development.",
        "LLM API: Access to a powerful language model API (like GPT-4) for generating text and content.",
        "Data Infrastructure: Robust data storage and processing capabilities to handle user data and BMC generation.",
        "Intellectual Property: Patents or copyrights related to your BMC generation technology."
      ]
    },
    "channels": {
      "explanation": "These are the ways through which you reach out to and deliver value to your customers.",
      "keyElements": [
        "Social Media: Utilize platforms like Twitter, LinkedIn, and Facebook to engage with your target audience and promote your service.",
        "Content Marketing: Create and distribute valuable content (e.g., blog posts, articles, webinars) to attract and educate potential customers.",
        "Partnerships: Leverage partnerships with other businesses or organizations to reach a wider audience."
      ]
    },
    "costStructure": {
      "explanation": "This outlines the costs incurred in operating your business.",
      "keyElements": [
        "Development Costs: Costs associated with building and maintaining your platform and algorithms.",
        "LLM API Costs: Fees for using the LLM API.",
        "Infrastructure Costs: Costs for hosting your platform and storing data.",
        "Marketing and Sales Costs: Costs for advertising, content creation, and customer acquisition."
      ]
    },
    "revenueStreams": {
      "explanation": "These are the ways in which your business generates revenue.",
      "keyElements": [
        "Subscription Model: Offer a subscription-based service where customers pay a recurring fee for access to your BMC generation platform.",
        "Freemium Model: Provide a basic version of your service for free and offer premium features or additional services for a fee.",
        "Enterprise Solutions: Offer customized solutions for larger businesses or organizations with specific needs."
      ]
    },
    "sitesToHelpMoveProjectForward": {
      "startupAccelerators": [
        "Y Combinator",
        "Techstars",
        "500 Startups"
      ],
      "crowdfundingPlatforms": [
        "Kickstarter",
        "Indiegogo"
      ],
      "businessPlanCompetitions": [
        "Various business plan competitions"
      ]
    }
  };
  
  return (
    <div className="container mx-auto p-4 pt-6">
        <h1 className="text-3xl font-bold mb-4">Pricing</h1>
        <div className="flex flex-wrap justify-center mb-4">
          {pricingTiers.map((tier) => (
            <div key={tier.name} className="w-full md:w-1/3 xl:w-1/3 p-6 text-left">
              <h2 className="text-2xl font-bold mb-2">{tier.name}</h2>
              <p className="text-3xl font-bold mb-2">${tier.price}</p>
              <ul>
                {tier.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>        
        <BMCGenerator bmcData={BBmcData} />
    </div>
  );
}

export default Pricing;