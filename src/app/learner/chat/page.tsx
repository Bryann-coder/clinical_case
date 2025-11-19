'use client';

import { useState, useEffect, useRef, createContext, useContext } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Sparkles, Loader2, Settings, ArrowUp, StopCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Types
type MessageMetadata = {
  target_audience?: string;
  brand_voice?: string;
};

type Message = { 
  id: number; 
  role: 'user' | 'assistant'; 
  content: string; 
  platform?: string;
  headline?: string;
  copy?: string;
  variation_type?: string;
  performance_metrics?: {
    engagement_score: number;
    conversion_potential: number;
    clarity_score: number;
    emotional_impact: number;
  };
  metadata?: MessageMetadata;
};

type CampaignData = { 
  title: string; 
  messages: Message[];
  performance_stats?: {
    total_ads: number;
    avg_engagement: number;
    best_performing: string;
  };
};

// Auth Context
type AuthContextType = {
  token: string | null;
  user: any | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (data: { user: any; jwt: string }) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>('demo-token');
  const [user, setUser] = useState<any | null>({ name: 'Demo User', email: 'demo@example.com' });
  const [isLoading, setIsLoading] = useState(false);

  const login = (data: { user: any; jwt: string }) => {
    setToken(data.jwt);
    setUser(data.user);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        token, 
        user, 
        isLoggedIn: !!token, 
        isLoading, 
        login, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Header Component
interface CampaignHeaderProps {
  title: string;
  totalAds: number;
  avgEngagement: number;
}

function CampaignHeader({ title, totalAds, avgEngagement }: CampaignHeaderProps) {
  return (
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-slate-900 truncate">{title}</h1>
            <p className="text-slate-500 text-sm mt-1">
              Generate compelling, platform-optimized ads for your product
            </p>
          </div>
          {totalAds > 0 && (
            <div className="flex items-center gap-6 text-sm flex-shrink-0 ml-4">
              <div className="text-center">
                <div className="text-xl font-bold text-blue-600">{totalAds}</div>
                <div className="text-slate-500 text-xs">Total Ads</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-green-600">{avgEngagement}%</div>
                <div className="text-slate-500 text-xs">Avg Engagement</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// User Message Component
interface UserMessageProps {
  content: string;
  metadata?: any;
  onEdit: (newContent: string, newMetadata: any) => void;
}

function UserMessage({ content, metadata, onEdit }: UserMessageProps) {
  return (
    <Card className="border border-slate-200 bg-white shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base text-slate-700 flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-bold">U</span>
          </div>
          Product URL
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-slate-600 mb-3">{content}</p>
        {metadata && (
          <div className="flex gap-2 mt-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {metadata.target_audience}
            </Badge>
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
              {metadata.brand_voice}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Ad Card Component
interface AdCardProps {
  ad: Message;
  onUpdate: (updates: Partial<Message>) => void;
}

function AdCard({ ad, onUpdate }: AdCardProps) {
  const getPlatformColor = (platform: string) => {
    const colors: { [key: string]: string } = {
      facebook: 'bg-blue-100 text-blue-800 border-blue-200',
      instagram: 'bg-pink-100 text-pink-800 border-pink-200',
      twitter: 'bg-sky-100 text-sky-800 border-sky-200',
      linkedin: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      tiktok: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[platform] || 'bg-slate-100 text-slate-800 border-slate-200';
  };

  return (
    <Card className="border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base text-slate-700">{ad.headline}</CardTitle>
          <Badge variant="outline" className={`border ${getPlatformColor(ad.platform!)}`}>
            {ad.platform}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        <p className="text-slate-600 text-sm">{ad.copy}</p>
        
        {ad.performance_metrics && (
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">
                {ad.performance_metrics.engagement_score}%
              </div>
              <div className="text-xs text-slate-500">Engagement</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">
                {ad.performance_metrics.conversion_potential}%
              </div>
              <div className="text-xs text-slate-500">Conversion</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Platform Ads Grid
interface PlatformAdsGridProps {
  platform: string;
  ads: Message[];
  onAdUpdate: (id: number, updates: Partial<Message>) => void;
}

function PlatformAdsGrid({ platform, ads, onAdUpdate }: PlatformAdsGridProps) {
  const platformNames: { [key: string]: string } = {
    facebook: 'Facebook',
    instagram: 'Instagram',
    twitter: 'Twitter/X',
    linkedin: 'LinkedIn',
    tiktok: 'TikTok'
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-800">{platformNames[platform]} Ads</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ads.map((ad) => (
          <AdCard 
            key={ad.id} 
            ad={ad} 
            onUpdate={(updates) => onAdUpdate(ad.id, updates)}
          />
        ))}
      </div>
    </div>
  );
}

// Campaign Conversations
interface CampaignConversationsProps {
  messages: Message[];
  onAdUpdate: (id: number, updates: Partial<Message>) => void;
  onEditUserMessage: (id: number, newContent: string, newMetadata: any) => void;
}

function CampaignConversations({ messages, onAdUpdate, onEditUserMessage }: CampaignConversationsProps) {
  const conversations = messages.reduce((acc, msg) => {
    if (msg.role === 'user') {
      acc.push({ userMessage: msg, aiResponses: [] });
    } else if (msg.role === 'assistant' && acc.length > 0) {
      acc[acc.length - 1].aiResponses.push(msg);
    }
    return acc;
  }, [] as { userMessage: Message; aiResponses: Message[] }[]);

  return (
    <div className="space-y-8">
      {conversations.map((conversation) => (
        <div key={conversation.userMessage.id} className="space-y-6">
          <UserMessage 
            content={conversation.userMessage.content}
            metadata={conversation.userMessage.metadata}
            onEdit={(newContent, newMetadata) => 
              onEditUserMessage(conversation.userMessage.id, newContent, newMetadata)
            }
          />
          
          {conversation.aiResponses.length > 0 && (
            <div className="space-y-6 ml-8">
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-6 bg-slate-100 p-1 rounded-lg">
                  <TabsTrigger value="all" className="rounded-md data-[state=active]:bg-white">
                    All Platforms
                  </TabsTrigger>
                  <TabsTrigger value="facebook" className="rounded-md data-[state=active]:bg-white">
                    Facebook
                  </TabsTrigger>
                  <TabsTrigger value="instagram" className="rounded-md data-[state=active]:bg-white">
                    Instagram
                  </TabsTrigger>
                  <TabsTrigger value="twitter" className="rounded-md data-[state=active]:bg-white">
                    Twitter/X
                  </TabsTrigger>
                  <TabsTrigger value="linkedin" className="rounded-md data-[state=active]:bg-white">
                    LinkedIn
                  </TabsTrigger>
                  <TabsTrigger value="tiktok" className="rounded-md data-[state=active]:bg-white">
                    TikTok
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="space-y-6 mt-6">
                  {Object.entries(
                    conversation.aiResponses.reduce((acc, aiMsg) => {
                      if (!aiMsg.platform) return acc;
                      if (!acc[aiMsg.platform]) acc[aiMsg.platform] = [];
                      acc[aiMsg.platform].push(aiMsg);
                      return acc;
                    }, {} as { [key: string]: Message[] })
                  ).map(([platform, ads]) => (
                    <PlatformAdsGrid 
                      key={`${conversation.userMessage.id}-${platform}`} 
                      platform={platform} 
                      ads={ads} 
                      onAdUpdate={onAdUpdate}
                    />
                  ))}
                </TabsContent>
                
                {['facebook', 'instagram', 'twitter', 'linkedin', 'tiktok'].map(platform => (
                  <TabsContent key={platform} value={platform} className="mt-6">
                    <PlatformAdsGrid 
                      platform={platform} 
                      ads={conversation.aiResponses.filter(msg => msg.platform === platform)} 
                      onAdUpdate={onAdUpdate}
                    />
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// Streaming Message Component
interface StreamingMessageProps {
  content: string;
  onStop: () => void;
}

function StreamingMessage({ content, onStop }: StreamingMessageProps) {
  return (
    <Card className="border border-blue-200 bg-blue-50/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base text-blue-700 flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Generating Ads...
          </CardTitle>
          <Button variant="outline" size="sm" onClick={onStop} className="border-red-200 text-red-600 hover:bg-red-50">
            <StopCircle className="h-4 w-4 mr-1" />
            Stop
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-slate-600">
          {content || 'Starting generation process...'}
        </div>
      </CardContent>
    </Card>
  );
}

// Advanced Settings Component
interface AdvancedSettingsProps {
  advancedSettings: any;
  setAdvancedSettings: (settings: any) => void;
}

function AdvancedSettings({ advancedSettings, setAdvancedSettings }: AdvancedSettingsProps) {
  return (
    <Card className="border border-slate-200 bg-white shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base text-slate-700 flex items-center gap-2">
          <Settings className="h-4 w-4" />
          Advanced Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Target Audience</label>
            <select 
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
              value={advancedSettings.target_audience}
              onChange={(e) => setAdvancedSettings({
                ...advancedSettings,
                target_audience: e.target.value
              })}
            >
              <option value="general">General</option>
              <option value="young_adults">Young Adults (18-25)</option>
              <option value="professionals">Professionals</option>
              <option value="parents">Parents</option>
              <option value="students">Students</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Brand Voice</label>
            <select 
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
              value={advancedSettings.brand_voice}
              onChange={(e) => setAdvancedSettings({
                ...advancedSettings,
                brand_voice: e.target.value
              })}
            >
              <option value="professional">Professional</option>
              <option value="casual">Casual</option>
              <option value="friendly">Friendly</option>
              <option value="luxury">Luxury</option>
              <option value="humorous">Humorous</option>
            </select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Campaign Input Component
interface CampaignInputProps {
  productUrl: string;
  setProductUrl: (url: string) => void;
  advancedSettings: any;
  setAdvancedSettings: (settings: any) => void;
  isLoading: boolean;
  isStreaming: boolean;
  onSubmit: (event: React.FormEvent) => void;
  onStop: () => void;
}

function CampaignInput({
  productUrl,
  setProductUrl,
  advancedSettings,
  setAdvancedSettings,
  isLoading,
  isStreaming,
  onSubmit,
  onStop
}: CampaignInputProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!productUrl.trim() || isLoading) return;
    onSubmit(event);
  };

  return (
    <div className="w-full p-4 bg-white/90 backdrop-blur-sm border-t border-slate-200">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Advanced Settings Toggle */}
        <div className="flex justify-center">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2 text-xs border-slate-300 text-slate-600 hover:bg-slate-50"
          >
            <Settings className="h-3 w-3" />
            {showAdvanced ? 'Hide' : 'Show'} Advanced Settings
          </Button>
        </div>

        {/* Advanced Settings */}
        {showAdvanced && (
          <AdvancedSettings 
            advancedSettings={advancedSettings}
            setAdvancedSettings={setAdvancedSettings}
          />
        )}
        
        {/* Main Input Form */}
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative flex items-center w-full p-2 pl-4 pr-14 bg-white border border-slate-300 rounded-xl shadow-sm hover:border-blue-400 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-200 transition-all">
            <Input
              type="url"
              placeholder="Paste product URL to generate multi-platform ads..."
              value={productUrl}
              onChange={(e) => setProductUrl(e.target.value)}
              disabled={isLoading}
              className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-base placeholder-slate-500 text-slate-700"
              required
            />
            
            {isStreaming ? (
              <Button
                type="button"
                onClick={onStop}
                size="icon"
                className="absolute right-2 h-10 w-10 rounded-lg bg-red-500 hover:bg-red-600 text-white shadow-md"
              >
                <StopCircle className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isLoading || !productUrl.trim()}
                size="icon"
                className="absolute right-2 h-10 w-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ArrowUp className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

// Main Campaign Page Component
export default function CampaignPage() {
  const [productUrl, setProductUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const [campaign, setCampaign] = useState<CampaignData | null>(null);
  const [isLoadingCampaign, setIsLoadingCampaign] = useState(true);
  const [advancedSettings, setAdvancedSettings] = useState({
    target_audience: 'general',
    brand_voice: 'professional'
  });
//   const { token } = useAuth();
const token = 'demo-token';
  // Mock data for demonstration
  useEffect(() => {
    const mockCampaign: CampaignData = {
      title: 'Summer Collection Campaign',
      messages: [
        {
          id: 1,
          role: 'user',
          content: 'https://example.com/summer-dress-collection',
          metadata: {
            target_audience: 'young_adults',
            brand_voice: 'casual'
          }
        },
        {
          id: 2,
          role: 'assistant',
          content: 'Generated ads for summer dress collection',
          platform: 'facebook',
          headline: 'Stay Cool This Summer',
          copy: 'Discover our lightweight summer dresses perfect for sunny days. Comfort meets style!',
          performance_metrics: {
            engagement_score: 85,
            conversion_potential: 78,
            clarity_score: 92,
            emotional_impact: 88
          }
        },
        {
          id: 3,
          role: 'assistant',
          content: 'Generated ads for summer dress collection',
          platform: 'instagram',
          headline: 'Summer Vibes ☀️',
          copy: 'Elevate your summer wardrobe with our new collection. Perfect for beach days and brunch dates!',
          performance_metrics: {
            engagement_score: 92,
            conversion_potential: 85,
            clarity_score: 88,
            emotional_impact: 95
          }
        }
      ]
    };

    setTimeout(() => {
      setCampaign(mockCampaign);
      setIsLoadingCampaign(false);
    }, 1000);
  }, []);

  const handleAdUpdate = (id: number, updates: Partial<Message>) => {
    setCampaign(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        messages: prev.messages.map(msg => 
          msg.id === id ? { ...msg, ...updates } : msg
        )
      };
    });
  };

  const handleEditUserMessage = async (messageId: number, newContent: string, newMetadata: any) => {
    setCampaign(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        messages: prev.messages.map(msg => 
          msg.id === messageId 
            ? { 
                ...msg, 
                content: newContent,
                metadata: { ...msg.metadata, ...newMetadata }
              } 
            : msg
        )
      };
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!productUrl.trim() || isLoading) return;
    
    setIsLoading(true);
    setIsStreaming(true);
    setStreamingContent('');
    
    // Simulate streaming
    const responses = [
      "Analyzing product URL...",
      "Extracting product information...",
      "Generating Facebook ad concepts...",
      "Creating Instagram campaign...",
      "Optimizing for Twitter/X...",
      "Finalizing LinkedIn strategy...",
      "Preparing TikTok variations..."
    ];

    for (let i = 0; i < responses.length; i++) {
      if (!isStreaming) break;
      setStreamingContent(responses[i]);
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    if (isStreaming) {
      // Add mock generated ads
      const newAds: Message[] = [
        {
          id: Date.now() + 1,
          role: 'assistant',
          content: `Generated ads for ${productUrl}`,
          platform: 'facebook',
          headline: 'New Product Alert!',
          copy: `Check out this amazing product: ${productUrl}. Perfect for your needs!`,
          performance_metrics: {
            engagement_score: Math.floor(Math.random() * 30) + 70,
            conversion_potential: Math.floor(Math.random() * 30) + 65,
            clarity_score: Math.floor(Math.random() * 20) + 80,
            emotional_impact: Math.floor(Math.random() * 25) + 75
          }
        },
        {
          id: Date.now() + 2,
          role: 'assistant',
          content: `Generated ads for ${productUrl}`,
          platform: 'instagram',
          headline: 'You Need This! ✨',
          copy: `Discover this incredible find: ${productUrl}. Transform your routine today!`,
          performance_metrics: {
            engagement_score: Math.floor(Math.random() * 30) + 70,
            conversion_potential: Math.floor(Math.random() * 30) + 65,
            clarity_score: Math.floor(Math.random() * 20) + 80,
            emotional_impact: Math.floor(Math.random() * 25) + 75
          }
        }
      ];

      setCampaign(prev => prev ? {
        ...prev,
        messages: [
          ...prev.messages,
          {
            id: Date.now(),
            role: 'user',
            content: productUrl,
            metadata: advancedSettings
          },
          ...newAds
        ]
      } : null);

      setProductUrl('');
    }

    setIsLoading(false);
    setIsStreaming(false);
    setStreamingContent('');
  };

  const stopStreaming = () => {
    setIsStreaming(false);
    setIsLoading(false);
    setStreamingContent('');
  };

  if (isLoadingCampaign) {
    return (
      <div className="flex items-center justify-center h-full bg-slate-50">
        <Card className="border border-slate-200 bg-white shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
              <span className="text-slate-600">Loading campaign...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="flex items-center justify-center h-full bg-slate-50">
        <Card className="border border-slate-200 bg-white shadow-sm">
          <CardContent className="pt-6">
            <p className="text-slate-500">Campaign not found.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const allAds = campaign.messages.filter(msg => msg.role === 'assistant' && msg.platform);
  const totalAds = allAds.length;
  const avgEngagement = totalAds > 0 
    ? Math.round(allAds.reduce((sum, ad) => sum + (ad.performance_metrics?.engagement_score || 0), 0) / totalAds)
    : 0;

  return (
    <div className="relative h-full flex flex-col bg-slate-50">
      <CampaignHeader 
        title={campaign.title}
        totalAds={totalAds}
        avgEngagement={avgEngagement}
      />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-4 md:p-8">
          {campaign.messages.length > 0 ? (
            <div className="space-y-8">
              <CampaignConversations 
                messages={campaign.messages}
                onAdUpdate={handleAdUpdate}
                onEditUserMessage={handleEditUserMessage}
              />
              
              {isStreaming && (
                <StreamingMessage 
                  content={streamingContent} 
                  onStop={stopStreaming}
                />
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-96 text-center">
              <div className="w-20 h-20 mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-lg">
                <Sparkles className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-slate-900 mb-4">{campaign.title}</h1>
              <p className="text-slate-600 text-lg max-w-md">
                Enter a product URL to generate compelling, platform-optimized ads across multiple social networks.
              </p>
            </div>
          )}
        </div>
      </div>

      <CampaignInput
        productUrl={productUrl}
        setProductUrl={setProductUrl}
        advancedSettings={advancedSettings}
        setAdvancedSettings={setAdvancedSettings}
        isLoading={isLoading}
        isStreaming={isStreaming}
        onSubmit={handleSubmit}
        onStop={stopStreaming}
      />
    </div>
  );
}