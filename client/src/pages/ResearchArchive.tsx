import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, FileText, Lock, Tag, Folder, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/hooks/use-auth";
import { useTranslation } from "react-i18next";
import type { DbDocument } from "@shared/schema";

export default function ResearchArchive() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [selectedDocument, setSelectedDocument] = useState<DbDocument | null>(null);

  const { data: categories = [] } = useQuery<Array<{ category: string; count: number }>>({
    queryKey: ["/api/research/categories"],
  });

  const { data: tags = [] } = useQuery<Array<{ tag: string; count: number }>>({
    queryKey: ["/api/research/tags"],
  });

  const { data: documents = [], isLoading } = useQuery<DbDocument[]>({
    queryKey: [
      "/api/research/documents",
      {
        category: selectedCategory || undefined,
        tag: selectedTag || undefined,
        accessLevel: user?.subscriptionTier || "none",
        search: searchTerm || undefined,
      },
    ],
  });

  const canAccessDocument = (doc: DbDocument) => {
    const tierHierarchy = ["none", "alpha", "beta", "theta", "gamma"];
    const userTierIndex = tierHierarchy.indexOf(user?.subscriptionTier || "none");
    const docTierIndex = tierHierarchy.indexOf(doc.accessLevel);
    return docTierIndex <= userTierIndex;
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "alpha":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "beta":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      case "theta":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      case "gamma":
        return "bg-red-500/20 text-red-300 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-red-500 mb-2" data-testid="text-page-title">
            Research Archive
          </h1>
          <p className="text-gray-400" data-testid="text-page-description">
            Citizen Cipher intelligence on cognitive biases, persuasion tactics, and defensive strategies
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-900 border-gray-800 text-white placeholder-gray-500"
              data-testid="input-search"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            {/* Category Filter */}
            <div className="flex-1 min-w-[200px]">
              <label className="text-sm text-gray-400 mb-2 block">
                <Folder className="inline h-4 w-4 mr-1" />
                Category
              </label>
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                <TabsList className="bg-gray-900 border border-gray-800">
                  <TabsTrigger value="" data-testid="tab-category-all">
                    All ({documents.length})
                  </TabsTrigger>
                  {categories.map((cat) => (
                    <TabsTrigger
                      key={cat.category}
                      value={cat.category}
                      data-testid={`tab-category-${cat.category}`}
                    >
                      {cat.category} ({cat.count})
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>

          {/* Tag Filter Pills */}
          {tags.length > 0 && (
            <div>
              <label className="text-sm text-gray-400 mb-2 block">
                <Tag className="inline h-4 w-4 mr-1" />
                Tags
              </label>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedTag === "" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag("")}
                  className="text-xs"
                  data-testid="button-tag-all"
                >
                  All
                </Button>
                {tags.slice(0, 12).map((tag) => (
                  <Button
                    key={tag.tag}
                    variant={selectedTag === tag.tag ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTag(tag.tag)}
                    className="text-xs"
                    data-testid={`button-tag-${tag.tag}`}
                  >
                    {tag.tag} ({tag.count})
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Document Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="bg-gray-900 border-gray-800 p-6 animate-pulse">
                <div className="h-6 bg-gray-800 rounded mb-3" />
                <div className="h-4 bg-gray-800 rounded mb-2" />
                <div className="h-4 bg-gray-800 rounded w-2/3" />
              </Card>
            ))}
          </div>
        ) : documents.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2" data-testid="text-no-results">
              No documents found
            </h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc) => {
              const hasAccess = canAccessDocument(doc);
              return (
                <Card
                  key={doc.id}
                  className={`bg-gray-900 border-gray-800 p-6 transition-all hover:border-red-500/50 ${
                    !hasAccess ? "opacity-50" : "cursor-pointer"
                  }`}
                  onClick={() => hasAccess && setSelectedDocument(doc)}
                  data-testid={`card-document-${doc.documentId}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <FileText className="h-6 w-6 text-red-500" />
                    {!hasAccess && <Lock className="h-5 w-5 text-gray-500" />}
                  </div>

                  <h3
                    className="text-lg font-semibold text-white mb-2 line-clamp-2"
                    data-testid={`text-title-${doc.documentId}`}
                  >
                    {doc.title}
                  </h3>

                  {doc.summary && (
                    <p className="text-sm text-gray-400 mb-3 line-clamp-3" data-testid={`text-summary-${doc.documentId}`}>
                      {doc.summary}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2 mb-3">
                    {doc.category && (
                      <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-300 border-blue-500/30">
                        {doc.category}
                      </Badge>
                    )}
                    <Badge variant="outline" className={`text-xs ${getTierColor(doc.accessLevel)}`}>
                      {doc.accessLevel.toUpperCase()}
                    </Badge>
                  </div>

                  {doc.tags && doc.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {doc.tags.slice(0, 3).map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-xs bg-gray-800 text-gray-400 border-gray-700"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {doc.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs bg-gray-800 text-gray-400 border-gray-700">
                          +{doc.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}

                  {hasAccess && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full mt-4 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      data-testid={`button-view-${doc.documentId}`}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Document
                    </Button>
                  )}
                </Card>
              );
            })}
          </div>
        )}

        {/* Document Detail Modal */}
        <Dialog open={!!selectedDocument} onOpenChange={() => setSelectedDocument(null)}>
          <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-4xl max-h-[90vh]">
            {selectedDocument && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-red-500" data-testid="text-modal-title">
                    {selectedDocument.title}
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                  {/* Metadata */}
                  <div className="flex flex-wrap gap-2">
                    {selectedDocument.category && (
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-300 border-blue-500/30">
                        <Folder className="h-3 w-3 mr-1" />
                        {selectedDocument.category}
                      </Badge>
                    )}
                    <Badge variant="outline" className={getTierColor(selectedDocument.accessLevel)}>
                      <Lock className="h-3 w-3 mr-1" />
                      {selectedDocument.accessLevel.toUpperCase()}
                    </Badge>
                    {selectedDocument.author && (
                      <Badge variant="outline" className="bg-gray-800 text-gray-300 border-gray-700">
                        By {selectedDocument.author}
                      </Badge>
                    )}
                  </div>

                  {selectedDocument.summary && (
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                      <h4 className="text-sm font-semibold text-gray-300 mb-2">Summary</h4>
                      <p className="text-sm text-gray-400">{selectedDocument.summary}</p>
                    </div>
                  )}

                  {/* Tags */}
                  {selectedDocument.tags && selectedDocument.tags.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-300 mb-2">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedDocument.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="bg-gray-800 text-gray-400 border-gray-700"
                          >
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-300 mb-2">Document Content</h4>
                    <ScrollArea className="h-[400px] w-full rounded-lg border border-gray-800 bg-black/50 p-6">
                      <div
                        className="prose prose-invert prose-sm max-w-none text-gray-300 whitespace-pre-wrap"
                        data-testid="text-document-content"
                      >
                        {selectedDocument.content}
                      </div>
                    </ScrollArea>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
