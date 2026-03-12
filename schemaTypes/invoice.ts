import { defineArrayMember, defineField, defineType } from 'sanity'

/**
 * Invoice schema for the online payment system.
 *
 * Invoices are created by the business owner in Sanity Studio. After publishing,
 * a unique payment link (`/pay/<token>`) can be copied and sent to the customer.
 * Stripe processes the payment; the webhook updates `status` to `paid` and stores
 * the `stripePaymentIntentId` automatically.
 *
 * Status lifecycle:
 *   draft → sent → paid
 *             └──→ cancelled
 */
export default defineType({
    name: 'invoice',
    title: 'Invoice',
    type: 'document',
    fields: [
        // ─── Invoice Identity ─────────────────────────────────────────────────────

        defineField({
            name: 'invoiceNumber',
            title: 'Invoice Number',
            type: 'string',
            description: 'Human-readable identifier (e.g. INV-2024-001).',
            validation: (rule) => rule.required(),
        }),

        /**
         * Unique token used as the URL key for the hidden payment page.
         * Should be a randomly generated UUID — use the "Generate Token" helper
         * in the studio, or paste a UUID from https://uuidgenerator.net
         */
        defineField({
            name: 'token',
            title: 'Payment Token',
            type: 'string',
            description:
                'Unique secret token used in the payment URL (/pay/<token>). Generate a UUID and paste it here. Keep this private — anyone with the link can pay.',
            validation: (rule) => rule.required(),
        }),

        // ─── Customer Info ────────────────────────────────────────────────────────

        defineField({
            name: 'customerName',
            title: 'Customer Name',
            type: 'string',
            validation: (rule) => rule.required(),
        }),

        defineField({
            name: 'customerEmail',
            title: 'Customer Email',
            type: 'string',
            description: 'Confirmation email is sent here after payment.',
            validation: (rule) => rule.required().email(),
        }),

        // ─── Line Items ───────────────────────────────────────────────────────────

        defineField({
            name: 'lineItems',
            title: 'Line Items',
            type: 'array',
            of: [
                defineArrayMember({
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'description',
                            title: 'Description',
                            type: 'string',
                            validation: (rule) => rule.required(),
                        }),
                        defineField({
                            name: 'quantity',
                            title: 'Quantity',
                            type: 'number',
                            initialValue: 1,
                            validation: (rule) => rule.required().min(1).integer(),
                        }),
                        defineField({
                            name: 'unitPrice',
                            title: 'Unit Price (USD)',
                            type: 'number',
                            description: 'Price per unit in USD.',
                            validation: (rule) => rule.required().min(0),
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'description',
                            quantity: 'quantity',
                            unitPrice: 'unitPrice',
                        },
                        prepare({ title, quantity, unitPrice }) {
                            const total = ((quantity ?? 1) * (unitPrice ?? 0)).toFixed(2)
                            return {
                                title: title ?? 'Unnamed item',
                                subtitle: `${quantity ?? 1} × $${(unitPrice ?? 0).toFixed(2)} = $${total}`,
                            }
                        },
                    },
                }),
            ],
        }),

        // ─── Dates ───────────────────────────────────────────────────────────────

        defineField({
            name: 'dueDate',
            title: 'Due Date',
            type: 'date',
            description: 'Payment due date shown to the customer on the payment page.',
        }),

        // ─── Notes ───────────────────────────────────────────────────────────────

        defineField({
            name: 'notes',
            title: 'Notes to Customer',
            type: 'text',
            description: 'Optional message displayed on the payment page (e.g., project details, terms).',
            rows: 4,
        }),

        // ─── Status & Stripe ─────────────────────────────────────────────────────

        defineField({
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    { title: '📝 Draft', value: 'draft' },
                    { title: '📤 Sent', value: 'sent' },
                    { title: '✅ Paid', value: 'paid' },
                    { title: '🚫 Cancelled', value: 'cancelled' },
                ],
                layout: 'radio',
            },
            initialValue: 'draft',
            validation: (rule) => rule.required(),
        }),

        /** Written automatically by the Stripe webhook when payment succeeds. */
        defineField({
            name: 'stripePaymentIntentId',
            title: 'Stripe Payment Intent ID',
            type: 'string',
            description: 'Auto-populated by Stripe webhook after a successful payment. Do not edit.',
            readOnly: true,
        }),
    ],

    /** Preview shows invoice number, customer name, status, and total in the studio list. */
    preview: {
        select: {
            invoiceNumber: 'invoiceNumber',
            customerName: 'customerName',
            status: 'status',
            lineItems: 'lineItems',
        },
        prepare({ invoiceNumber, customerName, status, lineItems }) {
            const total = (lineItems ?? []).reduce(
                (sum: number, item: { quantity?: number; unitPrice?: number }) =>
                    sum + (item.quantity ?? 1) * (item.unitPrice ?? 0),
                0,
            )
            const statusEmoji: Record<string, string> = {
                draft: '📝',
                sent: '📤',
                paid: '✅',
                cancelled: '🚫',
            }
            return {
                title: `${invoiceNumber ?? 'Untitled'} — ${customerName ?? 'Unknown'}`,
                subtitle: `${statusEmoji[status] ?? ''} ${status} · $${total.toFixed(2)}`,
            }
        },
    },
})
