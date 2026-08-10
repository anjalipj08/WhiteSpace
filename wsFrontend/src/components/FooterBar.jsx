import React from "react";
import {
  Footer,
  FooterBrand,
  FooterCopyright,
  FooterDivider,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from "flowbite-react";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsGithub,
  BsLinkedin,
} from "react-icons/bs";

function FooterBar() {
  return (
    <Footer
      container
      className="bg-gradient-to-b from-[#bdb4a6] via-[#a3a8ac] to-[#8faac2] rounded-none "
    >
      <div className="w-full">
        {/* Top Section */}
        <div className="grid w-full justify-between sm:flex sm:justify-between md:grid-cols-1">
          {/* Brand */}
          <div className="mb-6">
            <h3 className="text-white text-3xl">WhiteSpace</h3>
            
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-5 sm:gap-6">

            {/* Platform */}
            <div >
              <FooterTitle title="Platform" className="text-white" />
              <FooterLinkGroup col className="text-white/70">
                <FooterLink href="/how-it-works">How It Works</FooterLink>
                <FooterLink href="/categories">Ad Categories</FooterLink>
                <FooterLink href="/pricing">Pricing</FooterLink>
                <FooterLink href="/post-ad">Post an Ad</FooterLink>
              </FooterLinkGroup>
            </div>

            {/* Advertisers */}
            <div>
              <FooterTitle title="Advertisers" className="text-white"/>
              <FooterLinkGroup col className="text-white/70">
                <FooterLink href="/browse">Browse Resources</FooterLink>
                <FooterLink href="/campaigns">My Campaigns</FooterLink>
                <FooterLink href="/payments">Payments</FooterLink>
              </FooterLinkGroup>
            </div>

            {/* Resource Owners */}
            <div>
              <FooterTitle title="Resource Owners" className="text-white" />
              <FooterLinkGroup col className="text-white/70">
                <FooterLink href="/add-resource">List Your Resource</FooterLink>
                <FooterLink href="/my-resources">My Listings</FooterLink>
                <FooterLink href="/earnings">Earnings</FooterLink>
              </FooterLinkGroup>
            </div>

            {/* Support */}
            <div>
              <FooterTitle title="Support" className="text-white"/>
              <FooterLinkGroup col className="text-white/70">
                <FooterLink href="/contact">Contact Us</FooterLink>
                <FooterLink href="/faq">FAQ</FooterLink>
                <FooterLink href="/report">Report Issue</FooterLink>
              </FooterLinkGroup>
            </div>

            {/* Legal */}
            <div>
              <FooterTitle title="Legal" className="text-white"/>
              <FooterLinkGroup col className="text-white/70">
                <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
                <FooterLink href="/terms">Terms & Conditions</FooterLink>
                <FooterLink href="/refund-policy">Refund Policy</FooterLink>
              </FooterLinkGroup>
            </div>
          </div>
        </div>

        <FooterDivider />

        {/* Bottom Section */}
        <div className="w-full sm:flex sm:items-center sm:justify-between ">
          <FooterCopyright
            href="/"
            by="WhiteSpace™"
            year={2025}
            className="text-white"
          />

          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center ">
            <FooterIcon href="#" icon={BsFacebook} className="text-white " />
            <FooterIcon href="#" icon={BsInstagram} className="text-white" />
            <FooterIcon href="#" icon={BsTwitter} className="text-white"/>
            <FooterIcon href="#" icon={BsLinkedin} className="text-white"/>
            <FooterIcon href="#" icon={BsGithub} className="text-white"/>
          </div>
        </div>
      </div>
    </Footer>
  );
}

export default FooterBar;
