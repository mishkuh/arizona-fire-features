"use client"

import React, { useState } from 'react';
import * as motion from 'motion/react-client'
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { Button, Box, Section, Container, Grid, Flex, Heading, Text, Card, TextField, TextArea, Select, Spinner, Callout } from '@radix-ui/themes';
import { sendEmail } from '@/app/actions';

const Contact = () => {
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        location: '',
        details: '',
        source: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('idle');

        const { email, phone, location, details } = formData;

        if (!email || !phone || !location || !details) {
            return;
        }

        setIsSubmitting(true);

        try {
            console.log('Sending email...');

            const result = await sendEmail(formData);

            if (!result.success) {
                setStatus('error');
                return;
            }

            setStatus('success');
            setFormData({
                email: '',
                phone: '',
                location: '',
                details: '',
                source: '',
            });
        } catch (error) {
            console.error('Error sending email:', error);
            setStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSelectChange = (value: string) => {
        setFormData({
            ...formData,
            source: value
        });
    };

    return (
        <Box>
            {/* Hero Section */}
            <Section size="3">
                <Container size="3">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Flex direction="column" align="center" className="text-center text-white max-w-3xl mx-auto">
                            <Heading size="8" mb="6" className="font-novecento-sans">Get In Touch</Heading>
                            <Text size="5" className="block" color="gray">
                                Ready to transform your outdoor space? Let's discuss your project and provide a free consultation
                            </Text>
                        </Flex>
                    </motion.div>
                </Container>
            </Section>

            {/* Contact Section */}
            <Section size="3">
                <Container size="4" px="4">
                    <Grid columns={{ initial: '1', lg: '2' }} gap="9">
                        {/* Contact Information */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Flex direction="column" gap="8">
                                <Box>
                                    <Heading size="6" className=" mb-6 font-novecento-sans">Contact Information</Heading>
                                    <Text className="text-[var(--gray-11)] mb-8 block">
                                        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                                    </Text>
                                </Box>

                                <Flex direction="column" gap="6">
                                    <Card asChild size="3">
                                        <Link href="tel:6024697266">
                                            <Flex gap="4" align="start">
                                                <Flex justify="center" align="center" className="bg-[var(--orange-3)] p-3 rounded-full shrink-0">
                                                    <Phone className="w-6 h-6" color="orange" />
                                                </Flex>
                                                <Box>
                                                    <Text className=" mb-1 block font-novecento-sans">Phone</Text>
                                                    <Text className="text-[var(--gray-11)] block">(602) 469-7266</Text>
                                                    <Text size="1" className=" mt-1 block">Mon-Fri 8am-6pm, Sat 9am-4pm</Text>
                                                </Box>
                                            </Flex>
                                        </Link>
                                    </Card>

                                    <Card asChild size="3">
                                        <Link href="arizonafirefeatures@gmail.com">
                                            <Flex gap="4" align="start">
                                                <Flex justify="center" align="center" className="bg-[var(--orange-3)] p-3 rounded-full shrink-0">
                                                    <Mail className="w-6 h-6" color="orange" />
                                                </Flex>
                                                <Box>
                                                    <Text className=" mb-1 block font-novecento-sans">Email</Text>
                                                    <Text className="text-[var(--gray-11)] block">arizonafirefeatures@gmail.com</Text>
                                                    <Text size="1" className=" mt-1 block">We'll respond within 24 hours</Text>
                                                </Box>
                                            </Flex>
                                        </Link>
                                    </Card>

                                    <Card asChild size="3">
                                        <Link href="https://www.google.com/maps/search/?api=1&query=925+W+Hatcher+Rd,+Phoenix,+AZ+85021" target="_blank">
                                            <Flex gap="4" align="start">
                                                <Flex justify="center" align="center" className="bg-[var(--orange-3)] p-3 rounded-full shrink-0">
                                                    <MapPin className="w-6 h-6" color="orange" />
                                                </Flex>
                                                <Box>
                                                    <Text className=" mb-1 block font-novecento-sans">Address</Text>
                                                    <Text className="text-[var(--gray-11)] block">925 W. HATCHER RD</Text>
                                                    <Text className="text-[var(--gray-11)] block">PHOENIX AZ 85021</Text>
                                                </Box>
                                            </Flex>
                                        </Link>
                                    </Card>
                                </Flex>

                                <Card>
                                    <Flex direction="column" gap="4" p="4">
                                        <Heading size="4">Free Consultation</Heading>
                                        <Text color="gray">
                                            Schedule a free on-site consultation to discuss your project and receive a detailed estimate.
                                        </Text>
                                        <Text>No obligation • Expert advice • Custom solutions</Text>
                                    </Flex>
                                </Card>
                            </Flex>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Card size="4" className="shadow-xl">
                                <Flex direction="column" gap="4" p="4">
                                    <Heading size="6" className="mb-6">Send Us a Message</Heading>
                                    <form onSubmit={handleSubmit}>
                                        <Flex direction="column" gap="4">
                                            {status === 'success' && (
                                                <Callout.Root>
                                                    <Callout.Icon>
                                                        <CheckCircle className="w-4 h-4" />
                                                    </Callout.Icon>
                                                    <Callout.Text>
                                                        Message sent successfully! We'll get back to you shortly.
                                                    </Callout.Text>
                                                </Callout.Root>
                                            )}
                                            {status === 'error' && (
                                                <Callout.Root color="red">
                                                    <Callout.Icon>
                                                        <AlertCircle className="w-4 h-4" />
                                                    </Callout.Icon>
                                                    <Callout.Text>
                                                        Failed to send message. Please try again later.
                                                    </Callout.Text>
                                                </Callout.Root>
                                            )}
                                            <Box>
                                                <Text as="label" size="2" className=" mb-2 block">
                                                    Email Address <span className="text-red-500">*</span>
                                                </Text>
                                                <TextField.Root
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="your@email.com"
                                                    size="3"
                                                />
                                            </Box>

                                            <Box>
                                                <Text as="label" size="2" className=" mb-2 block">
                                                    Phone Number <span className="text-red-500">*</span>
                                                </Text>
                                                <TextField.Root
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="(555) 123-4567"
                                                    size="3"
                                                />
                                            </Box>

                                            <Box>
                                                <Text as="label" size="2" className=" mb-2 block">
                                                    Property Location <span className="text-red-500">*</span>
                                                </Text>
                                                <TextField.Root
                                                    type="text"
                                                    name="location"
                                                    value={formData.location}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="City, State or Full Address"
                                                    size="3"
                                                />
                                            </Box>

                                            <Box>
                                                <Text as="label" size="2" className=" mb-2 block">
                                                    Project Details <span className="text-red-500">*</span>
                                                </Text>
                                                <TextArea
                                                    name="details"
                                                    value={formData.details}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Tell us about your project - what services are you interested in, timeline, budget range, etc."
                                                    size="3"
                                                    rows={4}
                                                />
                                            </Box>

                                            <Box>
                                                <Text as="label" size="2" className=" mb-2 block">
                                                    How did you hear about us? <span>(Optional)</span>
                                                </Text>
                                                <Select.Root value={formData.source} onValueChange={handleSelectChange} size="3">
                                                    <Select.Trigger placeholder="Select an option" className="w-full" />
                                                    <Select.Content>
                                                        <Select.Group>
                                                            <Select.Item value="google">Google Search</Select.Item>
                                                            <Select.Item value="social">Social Media</Select.Item>
                                                            <Select.Item value="referral">Friend/Family Referral</Select.Item>
                                                            <Select.Item value="nextdoor">Nextdoor</Select.Item>
                                                            <Select.Item value="advertisement">Advertisement</Select.Item>
                                                            <Select.Item value="other">Other</Select.Item>
                                                        </Select.Group>
                                                    </Select.Content>
                                                </Select.Root>
                                            </Box>

                                            <Button disabled={isSubmitting} type="submit" size="4" className="w-full cursor-pointer">
                                                {isSubmitting ? 'Sending...' : 'Send Message'}
                                                {isSubmitting ? <Spinner className="ml-2 w-5 h-5" /> : <Send className="ml-2 w-5 h-5" />}
                                            </Button>

                                            <Text size="2" align="center">
                                                <span className="text-red-500">*</span> Required fields
                                            </Text>
                                        </Flex>
                                    </form>
                                </Flex>
                            </Card>
                        </motion.div>
                    </Grid>
                </Container>
            </Section>

            {/* Map Section */}
            <Box className="relative h-96">
                <Flex align="center" justify="center" className="absolute inset-0">
                    <Flex className="text-center" direction="column" gap="2">
                        <MapPin color="orange" className="w-16 h-16 mx-auto mb-4" />
                        <Heading size="5" className=" font-novecento-sans">Service Area</Heading>
                        <Heading size="3" color="gray">Phoenix Metropolitan Area</Heading>
                    </Flex>
                </Flex>
            </Box>
        </Box>
    );
};

export default Contact;
