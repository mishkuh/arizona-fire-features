import { Heading, Text, Separator, Callout } from '@radix-ui/themes';
import { TriangleAlertIcon } from 'lucide-react';

/**
 * TermsAndConditions
 *
 * Renders the full Terms and Conditions of Sale for Arizona Fire Features.
 * Suitable for standalone use on /terms and embedding in the purchase flow.
 */
export default function TermsAndConditions() {
    return (
        <div className="max-w-3xl mx-auto space-y-8 text-[var(--gray-11)]">

            {/* Header */}
            <div>
                <Heading as="h1" size="7" className="font-novecento-sans mb-2">
                    Terms and Conditions of Sale
                </Heading>
                <Text size="2" color="gray">Arizona Fire Features</Text>
            </div>

            <Separator size="4" />

            {/* 1. Acceptance */}
            <TermsSection title="Acceptance of Terms and Conditions">
                <Text as="p">
                    These terms and conditions of sale (&ldquo;Terms&rdquo; or &ldquo;Agreement&rdquo;) shall constitute a
                    binding contract between Arizona Fire Features and the buyers, purchasers, or customers
                    (collectively referred to as &ldquo;You&rdquo;, &ldquo;Your&rdquo;, or &ldquo;Customer&rdquo;) of its fireplaces, fire features
                    and related products (collectively &ldquo;Fire Features&rdquo;). These Terms shall govern all Fire
                    Features purchased from Arizona Fire Features and may not be modified or amended by any
                    oral agreement, course of performance, trade usage, or course of dealing. Any conflicting
                    term in any other document or communication shall be deemed rejected, unless such terms
                    are in a writing that expressly references the amendment of these Terms and is signed by
                    Arizona Fire Features. By placing an order Customer agrees to be bound by this Agreement.
                </Text>
            </TermsSection>

            {/* 2. Product Suitability */}
            <TermsSection title="Product Suitability">
                <Text as="p">
                    Not all Fire Features are suitable for every project, use, or application. For example, the
                    size and shape of the intended space will determine and limit the suitable Fire Features.
                    Each Fire Feature also requires a specific clearance to combustibles and therefore may
                    require different installation techniques. Likewise, special features, such as safety options,
                    may be required by applicable law depending on location. Customer is responsible to
                    determine whether the type, size, configuration, and optional features of the Fire Feature
                    are suitable for the particular project, design, space, application, property, framing
                    materials, structural requirements, condition, use, applicable law, code or regulation, or
                    specific need or purpose (collectively, &ldquo;Project Specifications&rdquo;).
                </Text>
                <Text as="p">
                    Arizona Fire Features makes no representations, guarantees, or warranties regarding the
                    suitability of Fire Features. Although Arizona Fire Features may provide guidance regarding
                    suitability, it is to be used for informational purposes only as it is based solely on
                    information provided by Customer, which may be incomplete or inaccurate. Arizona Fire
                    Features does not perform any independent investigation to confirm or evaluate Project
                    Specifications and therefore, any suitability guidance provided by Arizona Fire Features
                    should not be relied upon by Customer or any third-party.
                </Text>
            </TermsSection>

            {/* 3. Order Placement */}
            <TermsSection title="Order Placement">
                <Text as="p">
                    Each Quote is valid for thirty (30) days from the Quote Date (the &ldquo;Quote Expiration
                    Date&rdquo;). To place an order, Arizona Fire Features must receive an executed Quote and
                    Deposit funds, as described herein, on or before the Quote Expiration Date. Arizona Fire
                    Features shall confirm in writing, receipt of all purchase orders and Deposits within one (1)
                    business day of receipt. No order is binding on Arizona Fire Features unless and until
                    Arizona Fire Features issues a written confirmation. If you have not received written
                    confirmation from Arizona Fire Features, your order has not been placed; immediately
                    contact an Arizona Fire Features sales representative.
                </Text>
            </TermsSection>

            {/* 4. Order Review, Cancellations and Storage Fees */}
            <TermsSection title="Order Review, Cancellations and Storage Fees">
                <Text as="p">
                    Customer is responsible for reviewing all information on the Quote, including without
                    limitation, the quantities, type, and specifications of the Fire Features and Customer
                    information, including delivery address. Any errors, discrepancies, changes or modifications
                    shall be communicated to Arizona Fire Features prior to placing an order. Any order
                    changes, modifications, revisions or cancellations made after the order is placed may result
                    in delayed or multiple shipments, price changes, and fees up to and including the full
                    purchase price of the originally ordered Fire Features.
                </Text>
                <Text as="p">
                    Orders including custom built Fire Features (&ldquo;Custom Orders&rdquo;) canceled prior to entering
                    production are subject to a fee in the amount of 20% of the total purchase price. Custom
                    Orders canceled thereafter will be subject to larger cancellation fees determined at the sole
                    discretion of Arizona Fire Features, up to and including the total purchase price of the
                    originally ordered Fire Features. Customer agrees that the cancellation fees are reasonable
                    to compensate Arizona Fire Features for estimated losses it will incur as a result of the
                    canceled orders and do not reflect a penalty.
                </Text>
                <Text as="p">
                    Arizona Fire Features shall notify Customer when ordered Fire Features are ready to ship.
                    Any order not shipped at Customer&rsquo;s request within ten (10) days of notification of
                    completion may be subject to storage fees.
                </Text>
            </TermsSection>

            {/* 5. Returns */}
            <TermsSection title="Returns">
                <Text as="p">
                    Arizona Fire Features will only accept returns of non-custom Fire Features that have not
                    been used, installed or damaged that are returned within thirty (30) days of receipt. All
                    returns must be approved by Arizona Fire Features in advance and are subject to a
                    restocking fee of 25% the purchase price. Authorized returns (other than Nonconforming
                    Fire Features, described below) shall be subject to in/out freight and handling charges.
                </Text>
            </TermsSection>

            {/* 6. Pricing */}
            <TermsSection title="Pricing">
                <Text as="p">
                    All prices are subject to change until an order is placed and written confirmation is issued
                    by Arizona Fire Features, except that pricing reflected in a Quote will be held until the
                    Quote Expiration Date. Prices do not include the cost of freight or delivery, in-transit
                    insurance, storage, service, taxes, labor or installation, or any other incidental costs or
                    fees. Applicable sales tax varies by the State where the Fire Features are shipped. If any
                    Customer claims tax exempt status, a valid tax exemption certificate must be submitted to
                    Arizona Fire Features at the time the order is placed.
                </Text>
            </TermsSection>

            {/* 7. Payment */}
            <TermsSection title="Payment">
                <Text as="p">
                    A minimum deposit of 50% of the total purchase price is required at the time of order
                    placement (the &ldquo;Deposit&rdquo;), unless a different arrangement is agreed upon in a writing
                    signed by Arizona Fire Features. Signed Quotes received without the required Deposit will
                    be held pending the receipt of the Deposit payment and are subject to changes in pricing
                    and product availability until the Deposit is received and a written confirmation is issued
                    by Arizona Fire Features. Any additional and final payments shall be made by Customer in
                    accordance with the terms of the invoice. No third-party payments will be accepted unless
                    approved in writing by Arizona Fire Features. Any approval of third-party payments is an
                    accommodation and does not create any relationship between Arizona Fire Features and
                    the third-party.
                </Text>
                <Text as="p">
                    Any invoice that remains unpaid for more than 30 days from the due date provided in the
                    invoice will be considered delinquent and subject to interest at the lesser of 20% per month
                    or the highest rate permitted under applicable law. If for any reason an invoice remains
                    unpaid for more than forty-five (45) days or other grounds for insecurity arise with respect
                    to a due payment, Arizona Fire Features may, in its sole discretion, demand different terms
                    of payment or assurance, stop production on open orders and/or hold shipments until the
                    account is brought current or Customer agrees to modified payment terms satisfactory to
                    Arizona Fire Features. Should it be necessary to assign the account balance to a collection
                    agency or attorney for legal action, all subsequent collection charges and legal fees shall be
                    paid by Customer.
                </Text>
            </TermsSection>

            {/* 8. Lead Times and Delivery Dates */}
            <TermsSection title="Lead Times and Delivery Dates">
                <Text as="p">
                    Production lead times, shipping or delivery dates, whether listed in an Arizona Fire
                    Features Quote, Invoice or any other document, are estimates only based on average
                    production schedules. Such estimates are subject to change, without notice, and therefore
                    should not be relied on by Customer for any reason or purpose. Regardless of whether
                    Arizona Fire Features is made aware that Customer requires or requests a particular
                    shipping or delivery date, Arizona Fire Features does not guarantee compliance with such
                    deadline and therefore, shall not be liable for costs, fees or damages of any kind or nature
                    whatsoever, including but not limited to loss of profits or revenue, associated with
                    production, shipping or delivery delays. Extended lead times, shipping and/or delivery
                    dates may apply to Custom Orders.
                </Text>
            </TermsSection>

            {/* 9. Delivery and Acceptance */}
            <TermsSection title="Delivery and Acceptance">
                <Text as="p">
                    Customers or their receiving warehouses shall unpack and inspect the Fire Features
                    immediately upon arrival. Any Product damage, flaw, loss or shortage (collectively
                    &ldquo;Delivery Damage&rdquo;) must be noted at the time of delivery in the delivery documents and
                    corresponding claims shall be made directly to the Carrier. Customer or their receiving
                    warehouse should retain all packing materials of damaged items until the claim is resolved.
                </Text>
                <Text as="p">
                    Any errors, nonconformities, or inconsistencies with order specifications (other than
                    Delivery Damage) (collectively, &ldquo;Non-Conforming Product&rdquo;) shall be reported to Arizona
                    Fire Features, in writing, within five (5) business days of receipt of the shipment and shall
                    include photographs and other documentary evidence sufficient for Arizona Fire Features to
                    evaluate the claim. Arizona Fire Features shall have the right to inspect any
                    Non-Conforming Product and may request the return of the Non-Conforming Product to
                    facilitate such inspection. If, upon inspection, Arizona Fire Features determines that the
                    claim is unsubstantiated, the return will be rejected, and handling and restocking charges
                    will be assessed. Failure to report a claim of Delivery Damage or Non-Conforming Product
                    within the time frames set forth herein shall constitute a waiver of such claims and the
                    acceptance of the Fire Features as delivered.
                </Text>
            </TermsSection>

            {/* 10. Warranty */}
            <TermsSection title="Warranty; Exclusive Remedy">
                <Text as="p">
                    Arizona Fire Features guarantees and warrants, to the original Customer, subject to the
                    conditions and restrictions stated below, that each Fire Feature shall be free of defects in
                    materials and workmanship for a period of one (1) year from the delivery date. In the event
                    of a covered defect within the warranty period, Arizona Fire Features may, in its sole
                    discretion, make repairs or replace defective Fire Features or components. The warranty on
                    any replacement Product or component shall extend only for the balance of the warranty
                    period on the original Product. In no event shall Arizona Fire Features be responsible for
                    the cost of labor, installation, sales tax, finishing, or any other associated or incidental cost,
                    including but not limited to delay damages or loss of profits, for either the original or the
                    replacement Fire Features or parts, unless expressly required by state law. This limited
                    express warranty does not cover damage caused by improper installation, shipping,
                    accident, abuse, misuse, cleaning, third-party repairs, maintenance or modifications, or
                    normal wear and tear.
                </Text>
                <div className="bg-[var(--gray-3)] border border-[var(--gray-5)] rounded-md p-4 space-y-3">
                    <Text as="p" size="2" className="uppercase tracking-wide font-semibold text-[var(--gray-11)]">
                        ARIZONA FIRE FEATURES&rsquo;S LIMITED EXPRESS ONE (1) YEAR MATERIALS AND
                        WORKMANSHIP WARRANTY IS THE EXCLUSIVE WARRANTY OFFERED BY ARIZONA
                        FIRE FEATURES. ARIZONA FIRE FEATURES EXPRESSLY DISCLAIMS ALL OTHER
                        REPRESENTATIONS, WARRANTIES, CONDITIONS OR COVENANTS OF ANY KIND,
                        EITHER STATUTORY, EXPRESS, OR IMPLIED, INCLUDING WITHOUT LIMITATION,
                        ANY WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
                        OR SUITABILITY FOR A PARTICULAR PROPERTY OR LOCATION. OTHER EXPRESS
                        WARRANTIES MAY BE OFFERED BY THE THIRD-PARTY MANUFACTURERS; CONTACT
                        ARIZONA FIRE FEATURES FOR DETAILS.
                    </Text>
                    <Text as="p" size="2" className="uppercase tracking-wide font-semibold text-[var(--gray-11)]">
                        ARIZONA FIRE FEATURES SHALL NOT BE LIABLE FOR ANY INCIDENTAL,
                        CONSEQUENTIAL, INDIRECT, SPECIAL, CONTINGENT OR PUNITIVE DAMAGES,
                        INCLUDING WITHOUT LIMITATION, DAMAGE TO OR LOSS OF PROPERTY, PERSONAL
                        INJURY, LOSS OF PROFITS, BUSINESS OR REVENUE, OR OTHER COST, DAMAGE,
                        OR EXPENSE, FOR: (i) ANY CLAIM, WHETHER BASED ON A BREACH OF WARRANTY,
                        BREACH OF CONTRACT, TORT, STRICT LIABILITY OR OTHERWISE; (ii) THE TENDER
                        OF DEFECTIVE OR NON-CONFORMING GOODS; (iii) BREACH OF ANY OTHER
                        PROVISION OF ITS LIMITED EXPRESS WARRANTY OR THIS AGREEMENT. IN NO
                        EVENT SHALL ARIZONA FIRE FEATURES&rsquo;S LIABILITY EXCEED THE PURCHASE
                        PRICE PAID.
                    </Text>
                </div>
            </TermsSection>

            {/* 11. Indemnity */}
            <TermsSection title="Indemnity">
                <Text as="p">
                    Customer shall indemnify, defend and hold Arizona Fire Features, including its officers,
                    directors, employees, agents, representatives, subsidiaries, and affiliates and each of them
                    (collectively, &ldquo;Affiliates&rdquo;), harmless from and against any and all claims, causes of action,
                    liabilities, costs, losses, expenses or damages of any kind or nature whatsoever (including,
                    without limitation, reasonable attorneys&rsquo; fees and expenses, and any applicable fines or
                    penalties) of every kind and nature whatsoever (collectively, &ldquo;Claims&rdquo;) arising from or
                    connected with Customer or its Affiliates, subcontractors or independent contractors&rsquo;:
                    (1) negligent act or omission; (2) failure to leave sufficient clearance to combustibles or
                    any other installation method that is inconsistent with applicable law, code or regulation or
                    the instructions and guidelines provided by Arizona Fire Features or the applicable Fire
                    Feature manufacturer; (3) the installation of a Fire Feature that is not suitable to the
                    Project Specifications; and (4) Customer&rsquo;s breach of this Agreement.
                </Text>
            </TermsSection>

            {/* 12. Relationship */}
            <TermsSection title="Relationship">
                <Text as="p">
                    Customers, and their Affiliates, subcontractors and independent contractors operate as
                    independent contractors and are not employees, agents, or representatives of Arizona Fire
                    Features, nor are they in a partnership or joint venture with Arizona Fire Features. No right
                    is given to the Customer to enter into any agreement or commitment in the name of or on
                    behalf of Arizona Fire Features or to bind Arizona Fire Features in any respect whatsoever.
                </Text>
            </TermsSection>

            {/* 13. Severability */}
            <TermsSection title="Severability">
                <Text as="p">
                    In the event any provision in this Agreement is declared by any court of competent
                    jurisdiction to be illegal, void, or unenforceable, such provision shall be enforced to the
                    maximum extent valid and enforceable and the other provisions shall not be affected but
                    shall remain in full force and effect.
                </Text>
            </TermsSection>

            {/* 14. Governing Law */}
            <TermsSection title="Governing Law">
                <Text as="p">
                    These Terms shall be governed and construed in accordance with the laws of the State of
                    Arizona, without regard to conflicts of laws rules. In the event of any dispute between the
                    Parties pertaining to this Agreement, the prevailing Party shall be entitled to their
                    Attorneys&rsquo; fees.
                </Text>
            </TermsSection>

            {/* 15. Constructive Trust */}
            <TermsSection title="Constructive Trust">
                <Text as="p">
                    Customer agrees that all funds owed to Arizona Fire Features from anyone or received by
                    Customer, to the extent those funds result from Fire Features supplied by Arizona Fire
                    Features, shall be held in trust for the benefit of Arizona Fire Features (&ldquo;Trust Funds&rdquo;).
                    Customer may commingle Trust Funds, but agrees it has no interest in Trust Funds held by
                    anyone except to promptly account for and pay to Arizona Fire Features all Trust Funds in
                    accordance with applicable payment terms.
                </Text>
            </TermsSection>

            {/* 16. Force Majeure */}
            <TermsSection title="Force Majeure">
                <Text as="p">
                    Arizona Fire Features shall not be liable for delay or failure in performance arising from
                    any act of God or nature, strike, labor disruption, government action, materials shortages,
                    or other cause not within its control.
                </Text>
            </TermsSection>

            {/* 17. No Waiver */}
            <TermsSection title="No Waiver">
                <Text as="p">
                    In the event Arizona Fire Features decides, in its sole discretion, to deviate from any of
                    these Terms, such exception must be in a signed writing and shall apply only to the limited
                    circumstance and limited time for which it was granted and shall not be construed as a
                    waiver of Arizona Fire Features&rsquo; right to strictly enforce any provision thereafter.
                </Text>
            </TermsSection>

            {/* 18. Insurance */}
            <TermsSection title="Insurance">
                <Text as="p">
                    Customer shall maintain and/or its Affiliates, subcontractors or independent contractors
                    that install Arizona Fire Features&rsquo; products shall maintain Commercial General Liability
                    (&ldquo;CGL&rdquo;) insurance coverage with minimum limits of at least $1,000,000 per
                    occurrence / $2,000,000 general aggregate and provide Arizona Fire Features with
                    certificates of insurance evidencing such coverages upon request.
                </Text>
            </TermsSection>

            {/* 19. Warnings */}
            <TermsSection title="Warnings">
                <Callout.Root color="orange" variant="surface">
                    <Callout.Icon>
                        <TriangleAlertIcon size={16} />
                    </Callout.Icon>
                    <Callout.Text>
                        <span className="block font-semibold uppercase mb-1">Installation Warning</span>
                        IMPROPER INSTALLATION OF FIRE FEATURES MAY CAUSE FIRE DAMAGE TO
                        PROPERTY AND SERIOUS INJURY OR DEATH. ARIZONA FIRE FEATURES&rsquo; PRODUCTS
                        SHOULD ONLY BE INSTALLED BY INSURED, EXPERIENCED AND SKILLED
                        INSTALLATION PROFESSIONALS AND IN STRICT ACCORDANCE WITH MANUFACTURER
                        INSTALLATION INSTRUCTIONS AND ALL APPLICABLE BUILDING CODES AND
                        REGULATIONS.
                    </Callout.Text>
                </Callout.Root>
                <Callout.Root color="red" variant="surface">
                    <Callout.Icon>
                        <TriangleAlertIcon size={16} />
                    </Callout.Icon>
                    <Callout.Text>
                        <span className="block font-semibold uppercase mb-1">Clearance Warning</span>
                        BE SURE TO LEAVE SUFFICIENT DISTANCE BETWEEN ALL FIRE FEATURES AND
                        COMBUSTIBLE MATERIALS. COMBUSTIBLES INCLUDE, BUT ARE NOT LIMITED TO,
                        WOOD FRAMING AND OTHER FLAMMABLE MATERIALS OR ITEMS PLACED AROUND
                        OR IN FRONT OF THE UNIT. EACH TYPE OF FIRE FEATURE REQUIRES A DIFFERENT
                        DISTANCE OR CLEARANCE TO COMBUSTIBLES; CONTACT THE APPLICABLE
                        MANUFACTURER OR, IF A CUSTOM BUILT FEATURE, ARIZONA FIRE FEATURES, FOR
                        DETAILS. FAILURE TO ENSURE A SAFE DISTANCE BETWEEN FIRE FEATURES AND
                        ANY COMBUSTIBLE MATERIAL MAY RESULT IN FIRE DAMAGE TO PROPERTY AND
                        SERIOUS BODILY INJURY OR DEATH. ARIZONA FIRE FEATURES SHALL NOT BE
                        RESPONSIBLE FOR ANY DAMAGE OR INJURY CAUSED BY A FAILURE TO MAINTAIN
                        SAFE CLEARANCES.
                    </Callout.Text>
                </Callout.Root>
            </TermsSection>

        </div>
    );
}

/* ─── Helper ─────────────────────────────────────────────────────────────── */

function TermsSection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="space-y-3">
            <Heading as="h2" size="4" className="font-novecento-sans text-[var(--gray-12)]">
                {title}
            </Heading>
            <div className="space-y-3 leading-relaxed">
                {children}
            </div>
        </section>
    );
}
