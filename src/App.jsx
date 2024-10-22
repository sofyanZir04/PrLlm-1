"use client"

import { useState } from "react"
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { GoogleGenerativeAI } from '@google/generative-ai'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import html2pdf from 'html2pdf.js/dist/html2pdf.min';
import ReactMarkdown from 'react-markdown';
import BMCGenerator from './BMCGenerator';

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [generatedBMC, setGeneratedBMC] = useState(null)
  const [currentAnswer, setCurrentAnswer] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isFirst, setIsFirst] = useState(false)

  const API_KEY = "AIzaSyBOaFKYslA_uOVXoufIfwyJMfm9Z89Vp8E"; // Replace with your API Key
  const genAI = new GoogleGenerativeAI(API_KEY)

  const questions = [
    { id: "value_proposition", question: "What unique value does your product or service offer?", img: "./Designer.jpeg" },
    { id: "customer_segments", question: "Who are your target customers?", img: "./Designer (1).jpeg" },
    { id: "channels", question: "How will you reach your customers?", img: "./Designer (2).jpeg" },
    { id: "customer_relationships", question: "How will you build and maintain customer relationships?", img: "./Designer (5).jpeg" },
    { id: "revenue_streams", question: "How will your business generate revenue?", img: "./Designer (4).jpeg" },
    { id: "key_resources", question: "What key resources does your business require?", img: "./Designer (5).jpeg" },
    { id: "key_activities", question: "What key activities does your business need to perform?", img: "./Designer (6).jpeg" },
    { id: "key_partnerships", question: "Who are your key partners and suppliers?", img: "./Designer (5).jpeg" },
    { id: "cost_structure", question: "What are the main costs in your business model?", img: "./Designer (7).jpeg" },
  ]
 
  const handlePrevButton = (question) => {            
    if (question !== 0) {
      setIsFirst(true)
    }else{
      setIsFirst(false)
    }
  }
  const handleAnswerSubmit = () => {
    
    setAnswers({ ...answers, [questions[currentQuestion].id]: currentAnswer })            
    if (currentQuestion < questions.length - 1) {      
      handlePrevButton(currentQuestion + 1);
      setCurrentQuestion(currentQuestion + 1)
      setCurrentAnswer(answers[questions[currentQuestion + 1]?.id] || "")
    } else {
      generateBMC()
    }
  }

  const handlePreviousQuestion = () => {        
    if (currentQuestion > 0) {
      handlePrevButton(currentQuestion - 1);
      setCurrentQuestion(currentQuestion - 1)
      setCurrentAnswer(answers[questions[currentQuestion - 1]?.id] || "")
    }
  }

  const generateBMC = async () => {
    setIsLoading(true)
    try {
      const model = await genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
      const prompt = `Generate a comprehensive and insightful Business Model Canvas based on the following information:
          ${Object.entries(answers).map(([key, value]) => `${key.replace('_', ' ')}: ${value}`).join('\n')}

          Please provide a detailed analysis for each section of the Business Model Canvas, formatted as follows:

          For each section, please include:
          1. A concise explanation of the section's importance (2-3 sentences)
          2. 3-5 bullet points of key elements, each with a brief description
          3. If applicable, potential innovations or unique approaches for this business

          After the table, please add:

          ## Helpful Resources
          Provide a list of 5-7 relevant websites, tools, or platforms that can assist in developing or implementing aspects of this business model. For each resource, include:
          - Name of the resource
          - Brief description (1-2 sentences)
          - How it specifically relates to this business model or idea

          ## Action Steps
          Suggest 3-5 immediate, actionable steps the entrepreneur can take to start implementing this Business Model Canvas, prioritized by importance and feasibility.

          Please ensure the entire output is formatted in clear, responsive Json
          Focus on providing actionable, innovative, and well-explained content for each section.`
      // const prompt = `Generate a detailed Business Model Canvas based on the following information:
      //   ${Object.entries(answers).map(([key, value]) => `${key.replace('_', ' ')}: ${value}`).join('\n')}
        
      //   Please format the output as follows:
      //   1. Key Partners:
      //   2. Key Activities:
      //   3. Value Proposition:
      //   4. Customer Relationships:
      //   5. Customer Segments:
      //   6. Key Resources:
      //   7. Channels:
      //   8. Cost Structure:
      //   9. Revenue Streams:
        
      //   For each section, provide a brief explanation and bullet points of key elements.
      //   Add sites that will help his idea move forward with his project.        
      //   this is template of BMC on json

      //   Add part for sites that will help his idea move forward under table of BMC
      //   Return data in table and be responsive for mobile and laptop 
      //   Make return data with markdown`
      
      const result = await model.generateContent(prompt)
      const generatedContent = await result.response.text()
      setGeneratedBMC(generatedContent)      
    } catch (error) {
      console.error('Error generating BMC:', error)
      setGeneratedBMC("An error occurred while generating the Business Model Canvas. Please try again.")
    }
    setIsLoading(false)
  }

  // const downloadAsPDF = () => {
  //   try {      
  //     const htmlContent = generatedBMC ;//marked();  
  //     console.log(htmlContent);
      
  //     const doc = new jsPDF();      
  //     doc.html(htmlContent, {
  //       callback: (doc) => {
  //         doc.save("business_model_canvas.pdf");
  //       },
  //       margin: [10, 10, 10, 10], // Adjust margins as needed
  //       autoPaging: 'text',       // Handle page breaks
  //       x: 10,                    // X position for content
  //       y: 10                     // Y position for content
  //     });
  //   } catch (error) {
  //     console.error("Error generating PDF:", error);
  //     // alert("Error generating PDF. Please try again.");
  //   }
  // };  
  
  const sections = [
    {
      title: 'Key Partners',
      content: 'Supplier A, Supplier B, Strategic Alliance with Company X, Partner Network, Joint Ventures',
      color: 'bg-blue-100',
    },
    {
      title: 'Key Activities',
      content: 'Product Development, Market Research, Customer Service, Marketing Campaigns, Sales Operations',
      color: 'bg-green-100',
    },
    {
      title: 'Value Propositions',
      content: 'High-Quality Products, Exceptional Customer Support, Competitive Pricing, Unique Features, Fast Delivery',
      color: 'bg-yellow-100',
    },
    {
      title: 'Customer Relationships',
      content: 'Personalized Support, Loyalty Programs, Regular Updates, Community Engagement, Feedback Mechanisms',
      color: 'bg-red-100',
    },
    {
      title: 'Customer Segments',
      content: 'Small Businesses, Startups, Enterprises, Nonprofits, Individual Consumers, Tech Enthusiasts',
      color: 'bg-purple-100',
    },
    {
      title: 'Key Resources',
      content: 'Human Resources, Technology Infrastructure, Intellectual Property, Financial Assets, Brand Reputation, Supply Chain',
      color: 'bg-indigo-100',
    },
    {
      title: 'Channels',
      content: 'Website, Mobile App, Social Media, Email Marketing, Direct Sales, Retail Partners',
      color: 'bg-teal-100',
    },
    {
      title: 'Cost Structure',
      content: 'Fixed Costs: Salaries, Rent, Utilities; Variable Costs: Marketing, Production, Shipping, Customer Acquisition',
      color: 'bg-orange-100',
    },
    {
      title: 'Revenue Streams',
      content: 'Product Sales, Subscription Fees, Advertisements, Affiliate Marketing, Service Fees, Licensing',
      color: 'bg-pink-100',
    },
    {
      title: 'Market Trends',
      content: 'Growing Demand for Eco-Friendly Products, Increased Online Shopping, Rise of Subscription Services, Technological Advancements',
      color: 'bg-gray-100',
    },
    {
      title: 'Competitive Analysis',
      content: 'Competitor A: Strengths and Weaknesses; Competitor B: Market Share; New Entrants: Potential Disruption',
      color: 'bg-indigo-200',
    },
    {
      title: 'Regulatory Considerations',
      content: 'Compliance with Local Laws, Data Protection Regulations, Environmental Standards, Industry-Specific Guidelines',
      color: 'bg-teal-200',
    },
    {
      title: 'Future Opportunities',
      content: 'Expansion into New Markets, Development of New Products, Strategic Partnerships, Investment in Technology',
      color: 'bg-yellow-200',
    },
  ];

  const downloadAsPDF = async () => {
    try {
      // const options = {
      //   margin: 0.5, // Adjust margin if needed
      //   filename: 'BMC.pdf',
      //   image: { 
      //     type: 'jpeg', 
      //     quality: 1 // Set quality to maximum
      //   },
      //   html2canvas: { 
      //     scale: 2 // Increase scale for higher resolution
      //   },
      //   jsPDF: { 
      //     unit: 'in', 
      //     format: 'letter', 
      //     orientation: 'portrait'
      //   }
      // };
  
      const element = document.getElementById('result');
      if (!element) {
        throw new Error('Business Model Canvas element not found');
      }
      // const json = JSON.parse();
      console.log(generatedBMC);  
      // html2pdf()
      //   .set(options)  // Pass the updated options
      //   .from(element)
      //   .save();
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };
  const bmcData = {
    keyPartners: ["Partner 1", "Partner 2"],
    keyActivities: ["Activity 1", "Activity 2"],
    keyResources: ["Resource 1", "Resource 2"],
    valuePropositions: ["Proposition 1", "Proposition 2"],
    customerRelationships: ["Relationship 1", "Relationship 2"],
    channels: ["Channel 1", "Channel 2"],
    customerSegments: ["Segment 1", "Segment 2"],
    costStructure: ["Cost 1", "Cost 2"],
    revenueStreams: ["Revenue 1", "Revenue 2"]
  };
  
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
    <div className="flex flex-col h-screen bg-white text-black">
      {/* Navbar */}
      <header className="flex justify-center items-center p-4 bg-black text-white">
        <h1 className="text-2xl font-bold">BMC Generator</h1>
      </header>

      <div className="flex flex-1 flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl transition-all duration-500 transform">
          {/* Question Section */}
          {!generatedBMC ? (
            <>            
              {/* Image that identifies the question */}              
              <div className="flex flex-row space-x-4 border-black rounded-lg border-2 p-6">
                  <div className="w-[30%]">
                      <img src={questions[currentQuestion].img} alt={questions[currentQuestion].id} className="w-40 h-40 object-cover rounded-lg shadow-lg" />                      
                  </div>
                  <div className="flex w-[60%] flex-col">
                    {/* Question Text */}
                    <h2 className="text-2xl w-full font-bold text-center mb-4">{questions[currentQuestion].question}</h2>
                    <div className="flex w-full items-center space-x-2">
                      {/* Previous Button */}
                      {isFirst && (
                        <Button
                          disabled={currentQuestion === 0}
                          onClick={handlePreviousQuestion}
                          className="bg-black text-white py-2 rounded-lg"                  
                        >
                          <div className="flex items-center">
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            <span>Previous</span>                    
                          </div>
                        </Button>
                      )}
                      
                      {/* Input Field */}
                      <Input 
                        type="text"
                        className="w-full p-4 border rounded-lg"
                        placeholder="Type your answer here..."
                        value={currentAnswer}
                        onChange={(e) => setCurrentAnswer(e.target.value)}
                      />

                      {/* Next/Generate Button */}
                      <Button 
                          onClick={handleAnswerSubmit} 
                          className="flex justify-center items-center bg-black text-white py-2 rounded-lg"
                        >
                          {currentQuestion < questions.length - 1 ? (
                            <div className="flex items-center">
                              <span>Next</span>
                              <ChevronRight className="ml-2 h-4 w-4" />
                            </div>
                          ) : (
                            "Generate BMC"
                          )}
                      </Button>                
                    </div>                    
                  </div>
              </div>
              {/* Loader for generating BMC */}
              {isLoading && (
                <div className="flex justify-center mt-4">
                  <Loader2 className="animate-spin h-8 w-8 text-black" />
                </div>
              )}
            </>
          ) : (
            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-2xl font-bold text-center mb-4">Your Business Model Canvas</h2>
              <div id="result" className="whitespace-pre-wrap">                
                {/* <ReactMarkdown>{generatedBMC}</ReactMarkdown>                 */}
              </div>
              <div id="resultM" className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: generatedBMC }} /> Render safely
              <Button onClick={downloadAsPDF} className="mt-4 bg-black text-white py-2 rounded-lg">
                Download as PDF
              </Button>
              <BMCGenerator bmcData={generatedBMC} />
            </div>
          )}
        </div>
        <div className="bg-gray-100">
      <div className="h-screen p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 bg-white shadow-lg p-4">
          {sections.map((section, index) => (
            <div key={index} className={`border ${section.color} p-4 rounded-lg`}>
              <h3 className="font-semibold">{section.title}:</h3>
              <p>{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
      </div>
    </div>
  )
}